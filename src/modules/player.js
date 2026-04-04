import Gameboard from './gameboard';

export default class Player {
  constructor(type = 'human', name) {
    this.name = name;
    this.type = type;
    this.board = new Gameboard();
  }
}
