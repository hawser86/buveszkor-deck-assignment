const {cloneDeep} = require('lodash');
const permutationGenerator = require('./permutation-generator');

describe('permutationGenerator', function () {
  it('should generate 0 permutation for no element', function () {
    const input = [];
    const result = collectAll(permutationGenerator(input));
    expect(result).toEqual([]);
  });

  it('should generate 1 permutation for a single element', function () {
    const input = [1];
    const result = collectAll(permutationGenerator(input));
    expect(result).toEqual([[1]]);
  });

  it('should generate 2 permutation for a 2 elements', function () {
    const input = [1, 2];
    const result = collectAll(permutationGenerator(input));
    expect(result).toEqual([
      [1, 2],
      [2, 1]
    ]);
  });

  it('should generate 6 permutation for a 3 elements', function () {
    const input = [1, 2, 3];
    const result = collectAll(permutationGenerator(input));
    expect(result).toEqual([
      [1, 2, 3],
      [1, 3, 2],
      [2, 1, 3],
      [2, 3, 1],
      [3, 1, 2],
      [3, 2, 1]
    ]);
  });

  it('should generate 120 permutation for a 5 elements', function () {
    const input = [1, 2, 3, 4, 5];
    const result = collectAll(permutationGenerator(input));
    expect(result.length).toEqual(120);
  });
});

const collectAll = (iterator) => {
  const collected = [];
  for (let item of iterator) {
    collected.push(cloneDeep(item));
  }
  return collected;
};
