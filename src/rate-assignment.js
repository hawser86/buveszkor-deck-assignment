const { sum } = require('lodash');

module.exports = (votesByName, assignment) => {
  const givenPoints = assignment.map(a => votesByName[a.name][a.card]);
  return sum(givenPoints);
};
