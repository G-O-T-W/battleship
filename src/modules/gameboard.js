import Ships from './ships';

export default class Gameboard {
  constructor() {
    this.grid = [];
    this.missedShots = [];
  }

  placeShip(posA, posB) {
    let length = posA[0] - posB[0];
    if (length != 0 && posA[1] == posB[1]) {
      const ship = new Ships(length);
      for (let i = posA[0]; i <= posB[0]; i++) {
        if (this.grid[i] === undefined) this.grid[i] = []; 
        this.grid[i][posA[1]] = ship;
      }
    }
    length = posA[1] - posB[1];
    if (length != 0 && posA[0] == posB[0]) {
      const ship = new Ships(length);
      if (this.grid[posA[0]] === undefined) this.grid[posA[0]] = []; 
      for (let i = posA[1]; i <= posB[1]; i++) {
        this.grid[posA[0]][i] = ship;
      }
    }
  }
}
