import Gameboard from '../src/modules/gameboard';

describe('Gameboard class is working correctly', () => {
  const gameBoard = new Gameboard();
  test('placeShip() function is working as intended', () => {
    gameBoard.placeShip([0, 0], [3, 0]);
    expect(gameBoard.grid[0][0]).not.toEqual(-1);
    expect(gameBoard.grid[1][0]).not.toEqual(-1);
    expect(gameBoard.grid[2][0]).not.toEqual(-1);
    expect(gameBoard.grid[3][0]).not.toEqual(-1);
  });
  test('placeShip() does override existing ship placements', () => {
    gameBoard.placeShip([0, 0], [0, 3]);
    expect(gameBoard.grid[0][1]).toEqual(-1);
    expect(gameBoard.grid[0][2]).toEqual(-1);
    expect(gameBoard.grid[0][3]).toEqual(-1);
  });
  test.todo('receiveAttack() function is working as intended');
});
