import Ships from '../src/modules/ships';

describe('All methods in ships class are working', () => {
  const ship = new Ships(3);
  test('hits() function is working as intended', () => {
    expect(ship.numOfHits).toBe(0);
    ship.hit();
    expect(ship.numOfHits).toBe(1);
    ship.hit();
    expect(ship.numOfHits).toBe(2);
  });

  test('isSunk() function is working as intended', () => {
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
