import Gameboard from '../src/modules/gameboard';

describe('Gameboard class is working correctly', () => {
  const gameBoard = new Gameboard();
  test('placeShip() function is working as intended', () => {
    gameBoard.placeShip([0, 0], [0, 3]);
    expect(gameBoard.grid[0][0]).toBeDefined();
    expect(gameBoard.grid[0][1]).toBeDefined();
    expect(gameBoard.grid[0][2]).toBeDefined();
  });
  test.todo('receiveAttack() function is working as intended');
});
