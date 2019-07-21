const { keyBy, sum } = require('lodash');

module.exports = votes => {
  const votesByName = keyBy(votes, 'name');
  return assignment => {
    const givenPoints = assignment.map(a => votesByName[a.name][a.card]);
    return sum(givenPoints);
  };
};
