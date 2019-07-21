const permutationGenerator = function * (arr, result = []) {
  if (arr.length === 0 && result.length > 0) {
    yield result;
  }

  for (let i = 0; i < arr.length; i++) {
    result.push(arr[i]);
    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
    yield * permutationGenerator(rest, result);
    result.pop();
  }
};

module.exports = permutationGenerator;
