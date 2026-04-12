import UserInterface from './userInterface';
import Player from './player';

export default class Controller {
  constructor() {
    this.ui = new UserInterface();
    this.players = [];
    this.roundPlayer;
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
   if(this.checkWinner()) return;
    if (this.roundPlayer.type === 'computer') {
      this.playComputerRound();
    }
  }

  playComputerRound() {
    console.log('Computer Plays Now');
    setTimeout(() => {
      this.togglePlayer();

      //       let x = parseInt(`${Math.random()*10}`);
      //       let y = parseInt(`${Math.random()*10}`);
      // const missedShots = this.roundPlayer.gameBoard.missedShots;
      //       while (missedShots.includes([x, y])) {
      //
      //       }
      //       this.roundPlayer.
    }, 30);
  }

  handleAttack(x, y) {
    this.roundPlayer.gameBoard.receiveAttack([x, y]);
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
  }
}
