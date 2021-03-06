const _ = require('lodash');
const loadVotes = require('./load-votes');
const permutationGenerator = require('./permutation-generator');
const rateAssignment = require('./rate-assignment');

module.exports = ({ pathToVotes, resultLength = 10, maxDiffThreshold = 5 }) => {
  const votes = loadVotes(pathToVotes);
  const cards = collectCards(votes);
  const names = collectNames(votes);
  const votesByName = _.keyBy(votes, 'name');
  let topAssignments = [];

  for (const permutation of permutationGenerator(cards)) {
    const assignment = createAssignment(names, permutation);
    const rating = rateAssignment(votesByName, assignment);

    if (newAssignmentFound(topAssignments, resultLength, maxDiffThreshold, rating)) {
      const assignmentWithPoints = assignment.map(a => ({ ...a, point: votesByName[a.name][a.card] }));
      topAssignments.push({ rating, assignment: assignmentWithPoints });
      topAssignments = getTopAssignments(topAssignments, resultLength);
    }
  }

  return topAssignments;
};

const collectCards = votes => {
  return _(votes[0])
    .keys()
    .pull('name')
    .value();
};

const collectNames = votes => {
  return votes.map(v => v.name);
};

const createAssignment = (names, permutation) => {
  const pairs = _.unzip([names, permutation]);
  return pairs.map(p => ({ name: p[0], card: p[1] }));
};

const newAssignmentFound = (topAssignments, resultLength, maxDiffThreshold, rating) => {
  return rating.maxDiff <= maxDiffThreshold &&
    (topAssignments.length < resultLength || rating.sum > getWorstSum(topAssignments));
};

const getWorstSum = assignments => {
  const worst = _.last(assignments);
  return _.get(worst, 'rating.sum', 0);
};

const getTopAssignments = (assignments, resultLength) => {
  return _(assignments)
    .orderBy('rating.sum', 'desc')
    .take(resultLength)
    .value();
};
