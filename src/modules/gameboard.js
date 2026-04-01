import Ships from './ships.js';

export default class Gameboard {
  constructor() {
    this.missedShots = [];
    this.rows = 10;
    this.cols = 10;
    this.grid = Array(this.rows) // instantiate the grid
      .fill()
      .map(() => Array(this.cols).fill(-1));
  }

  findOrientation(posA, posB) {
    let lenX = posA[0] - posB[0]; // lenX is difference in x co-ordinate
    if (lenX == 0) return 'h';
    else return 'v';
  }

  findLength(orientation, posA, posB) {
    if (orientation == 'h') return Math.abs(posA[1] - posB[1]) + 1;
    else return Math.abs(posA[0] - posB[0]) + 1;
  }

  findRange(orientation, posA, posB) {
    let start, end;
    if (orientation == 'h') {
      // place horizonatlly
      start = posA[1] < posB[1] ? posA[1] : posB[1];
      end = start == posA[1] ? posB[1] : posA[1];
    } else {
      // place vertically
      start = posA[0] < posB[0] ? posA[0] : posB[0];
      end = start == posA[0] ? posB[0] : posA[0];
    }
    return [start, end];
  }

  isEmpty(orientation, posA, posB) {
    const [start, end] = this.findRange(orientation, posA, posB);
    if (orientation == 'h') {
      const i = posA[0];
      for (let j = start; j <= end; j++) {
        if (this.grid[i][j] != -1) return false;
      }
    } else {
      const j = posA[1];
      for (let i = start; i <= end; i++) {
        if (this.grid[i][j] != -1) return false;
      }
    }
    return true;
  }

  isValid(posA, posB) {
    return (
      posA[0] < this.rows &&
      posA[0] >= 0 &&
      posA[1] < this.cols &&
      posA[1] >= 0 &&
      posB[0] < this.rows &&
      posB[0] >= 0 &&
      posB[1] < this.cols &&
      posB[1] >= 0
    );
  }

  placeShip(posA, posB) {
    const orientation = this.findOrientation(posA, posB);
    // don't place ship if co-ordinates are filled already or if out of bounds
    if (!this.isEmpty(orientation, posA, posB) || !this.isValid(posA, posB))
      return;
    const length = this.findLength(orientation, posA, posB);
    const ship = new Ships(length);
    const [start, end] = this.findRange(orientation, posA, posB);
    if (orientation == 'h') {
      const i = posA[0];
      for (let j = start; j <= end; j++) {
        this.grid[i][j] = ship;
      }
    } else {
      const j = posA[1];
      for (let i = start; i <= end; i++) {
        this.grid[i][j] = ship;
      }
    }
  }
}

