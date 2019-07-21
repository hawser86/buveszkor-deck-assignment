const sum = require('./sum');

describe('sum', () => {
  it('should add numbers', () => {
    expect(sum(2, 3)).toEqual(5);
  });
});
