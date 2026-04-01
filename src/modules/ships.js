export default class Ships {
  constructor(length) {
    this.length = length;
    this.numOfHits = 0;
  }

  hit() {
    this.numOfHits = Math.min(this.length, ++this.numOfHits);
  }

  isSunk() {
    return this.length === this.numOfHits;
  }
}
