import Gameboard from './gameboard';

export default class Player {
  constructor(name, type = 'human') {
    this.name = name;
    this.type = type;
    this.hasWon = false;
    this.gameBoard = new Gameboard();
  }
}
