import UserInterface from './userInterface';
import Player from './player';

export default class Controller {
  constructor() {
    this.ui = new UserInterface();
    this.ui.setupDialogListeners();
    this.playerOne = new Player('playerOne');
    this.playerOne.gameBoard.randomlyPlaceShips();
    this.playerTwo = new Player('playerTwo');
    this.playerTwo.gameBoard.randomlyPlaceShips();
  }

  startGame() {
    this.ui.clearBoard();
    this.ui.setupGameboard(this.playerOne);
    this.ui.setupGameboard(this.playerTwo);
  }
}
