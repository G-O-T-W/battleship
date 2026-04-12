import Gameboard from './gameboard';

export default class Player {
  constructor(ID, name, type = 'human') {
    this.ID = ID;
    this.name = name;
    this.type = type;
    this.hasWon = false;
    this.gameBoard = new Gameboard();
    this.isReady = false;
  }
}
