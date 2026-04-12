import UserInterface from './userInterface';
import Player from './player';

export default class Controller {
  constructor() {
    this.ui = new UserInterface();
    this.players = [];
    this.roundPlayer;
    this.possibleComputerMoves = [];
    this.populateComputerMoves();
    this.gameStarted = false;
  }

  populateComputerMoves() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        this.possibleComputerMoves.push([i, j]);
      }
    }
    // Fisher-Yates sorting algorithm
    let currentIndex = this.possibleComputerMoves.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [
        this.possibleComputerMoves[currentIndex],
        this.possibleComputerMoves[randomIndex],
      ] = [
        this.possibleComputerMoves[randomIndex],
        this.possibleComputerMoves[currentIndex],
      ];
    }
  }

  init() {
    this.ui.setupDialogListeners();
    this.ui.setupButtonListeners(
      this.startGame.bind(this),
      this.randomize.bind(this)
    );
    this.ui.openSettings();
  }

  startGame(p1name, p2name, p2type) {
    this.resetGame();
    this.createPlayer('player-one', p1name, 'human');
    this.createPlayer('player-two', p2name, p2type);
    for (const player of this.players) {
      this.ui.renderShips(player.ID);
      if (player.ID === 'player-two') {
        if (player.type === 'computer')
          this.ui.disableRandomizeButton('player-two'); // add randomize button if playing against human
        else this.ui.enableRandomizeButton('player-two');
      }
      this.ui.renderGameboard(
        player.ID,
        player.name,
        player.gameBoard.grid,
        this.playHumanRound.bind(this),
        this.whoseTurn.bind(this),
        this.checkAllReady.bind(this)
      );
    }
    if (p2type === 'human') {
      this.ui.openInstructions();
    }
    this.roundPlayer = this.players[0];
    this.ui.showPlayerTurn(this.roundPlayer.name);
  }

  randomize(playerID) {
    if (this.gameStarted) return; // if game has begun then randomize does nothing
    for (const player of this.players) {
      if (player.ID === playerID) {
        player.gameBoard.randomlyPlaceShips();
        this.ui.renderGameboard(
          player.ID,
          player.name,
          player.gameBoard.grid,
          this.playHumanRound.bind(this),
          this.whoseTurn.bind(this),
          this.checkAllReady.bind(this)
        );
        this.ui.toggleShipVisibility(playerID);
        player.isReady = true;
      }
    }
  }

  togglePlayer() {
    this.roundPlayer =
      this.roundPlayer === this.players[0] ? this.players[1] : this.players[0];
    this.ui.showPlayerTurn(this.roundPlayer.name);
  }

  playHumanRound(x, y) {
    console.log(`${this.roundPlayer.name} clicked [${x}, ${y}].`);
    this.gameStarted = true;
    this.togglePlayer(); // toggle first so that right board is updated
    this.handleAttack(x, y);
    if (this.checkWinner()) return;
    if (this.roundPlayer.type === 'computer') {
      this.playComputerRound();
    }
  }

  playComputerRound() {
    console.log('Computer Plays Now');
    setTimeout(() => {
      this.togglePlayer(); // toggle first so that right board is updated
      const [x, y] = this.possibleComputerMoves.pop();
      this.handleAttack(x, y);
      if (this.checkWinner()) return;
    }, 500);
  }

  handleAttack(x, y) {
    this.roundPlayer.gameBoard.receiveAttack([x, y]);
    this.ui.repaintCell(this.roundPlayer.ID, x, y);
    if (this.roundPlayer.gameBoard.hasAllShipSunk()) {
      this.togglePlayer();
      this.roundPlayer.hasWon = true;
      this.togglePlayer();
    }
  }

  checkWinner() {
    for (const player of this.players) {
      if (player.hasWon) {
        console.log(player.name + ' has won the game!');
        this.ui.openWinnerDialog(player.name);
        return true;
      }
    }
    return false;
  }

  createPlayer(ID, name, type) {
    const player = new Player(ID, name, type);
    if (type == 'computer') {
      player.gameBoard.randomlyPlaceShips();
      player.isReady = true;
    }
    this.players.push(player);
  }

  whoseTurn() {
    return this.roundPlayer.name;
  }

  checkAllReady() {
    for (const player of this.players) {
      if (player.isReady === false) return false;
    }
    return true;
  }

  resetGame() {
    this.players = [];
    this.possibleComputerMoves = [];
    this.populateComputerMoves();
    this.gameStarted = false;
  }
}
