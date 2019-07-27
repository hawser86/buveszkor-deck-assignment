const { sum } = require('lodash');

module.exports = (votesByName, assignment) => {
  const givenPoints = assignment.map(a => votesByName[a.name][a.card]);
  return {
    sum: sum(givenPoints),
    maxDiff: Math.max(...givenPoints) - Math.min(...givenPoints)
  };
};
