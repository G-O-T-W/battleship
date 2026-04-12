import UserInterface from './userInterface';
import Player from './player';

export default class Controller {
  constructor() {
    this.ui = new UserInterface();
    this.players = [];
    this.roundPlayer;
    this.possibleComputerMoves = [];
    this.populateComputerMoves();
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
    this.ui.setupDialogListeners(this.startGame.bind(this));
    this.ui.openSettings();
  }

  startGame(p1name, p1type, p2name, p2type) {
    this.resetGame();
    this.createPlayer(p1name, p1type);
    this.createPlayer(p2name, p2type);
    for (const player of this.players) {
      this.ui.renderGameboard(
        player.name,
        player.gameBoard.grid,
        this.playHumanRound.bind(this),
        this.whoseTurn.bind(this)
      );
    }
    this.roundPlayer = this.players[0];
    this.ui.showPlayerTurn(this.roundPlayer.name);
  }

  togglePlayer() {
    this.roundPlayer =
      this.roundPlayer === this.players[0] ? this.players[1] : this.players[0];
    this.ui.showPlayerTurn(this.roundPlayer.name);
  }

  playHumanRound(x, y) {
    console.log(`${this.roundPlayer.name} clicked [${x}, ${y}].`);
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
    this.ui.repaintCell(this.roundPlayer.name, x, y);
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

  createPlayer(name, type) {
    const player = new Player(name, type);
    player.gameBoard.randomlyPlaceShips();
    this.players.push(player);
  }

  whoseTurn() {
    return this.roundPlayer.name;
  }

  resetGame() {
    this.players = [];
    this.possibleComputerMoves = [];
    this.populateComputerMoves();
  }
}
