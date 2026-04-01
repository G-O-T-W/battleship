import Gameboard from '../src/modules/gameboard';

describe('Gameboard class is working correctly', () => {
  const gameBoard = new Gameboard();
  beforeEach(() => {
    gameBoard.placeShip([3, 0], [0, 0]);
    gameBoard.placeShip([5, 4], [5, 2]);
  });

  test('placeShip() function is working as intended - vertical placement', () => {
    expect(gameBoard.grid[0][0]).not.toEqual(-1);
    expect(gameBoard.grid[1][0]).not.toEqual(-1);
    expect(gameBoard.grid[2][0]).not.toEqual(-1);
    expect(gameBoard.grid[3][0]).not.toEqual(-1);
  });

  test('placeShip() function is working as intended - horizontal placement', () => {
    expect(gameBoard.grid[5][4]).not.toEqual(-1);
    expect(gameBoard.grid[5][3]).not.toEqual(-1);
    expect(gameBoard.grid[5][2]).not.toEqual(-1);
  });

  test('placeShip() does not override existing ship placements', () => {
    const shipOne = gameBoard.grid[3][0];
    gameBoard.placeShip([0, 0], [0, 3]);
    expect(gameBoard.grid[0][0]).toEqual(shipOne);
    expect(gameBoard.grid[0][1]).toEqual(-1);
    expect(gameBoard.grid[0][2]).toEqual(-1);
    expect(gameBoard.grid[0][3]).toEqual(-1);
  });

  test('receiveAttack() only stores missing shot if no ship is hit', () => {
    const shipOne = gameBoard.grid[3][0];
    const shipTwo = gameBoard.grid[5][4];
    gameBoard.receiveAttack([5, 5]);
    expect(gameBoard.missedShots).toContainEqual([5, 5]);
    gameBoard.receiveAttack([8, 3]);
    expect(gameBoard.missedShots).toContainEqual([8, 3]);
    expect(shipOne.numOfHits).toEqual(0);
    expect(shipTwo.numOfHits).toEqual(0);
  });

  test('receiveAttack() increases numOfHits if a ship is hit', () => {
    const shipOne = gameBoard.grid[3][0];
    gameBoard.receiveAttack([3, 0]);
    expect(shipOne.numOfHits).toEqual(1);
    gameBoard.receiveAttack([1, 0]);
    expect(shipOne.numOfHits).toEqual(2);
    gameBoard.receiveAttack([2, 0]);
    expect(shipOne.numOfHits).toEqual(3);
    expect(shipOne.numOfHits).toEqual(3);
  });
});
