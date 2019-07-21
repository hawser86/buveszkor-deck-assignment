const _ = require('lodash');
const loadVotes = require('./load-votes');
const permutationGenerator = require('./permutation-generator');
const rateAssignment = require('./rate-assignment');

const resultLength = 10;

module.exports = pathToVotes => {
  const votes = loadVotes(pathToVotes);
  const cards = collectCards(votes);
  const names = collectNames(votes);
  const rate = rateAssignment(votes);
  let topAssignments = [];

  for (const permutation of permutationGenerator(cards)) {
    const assignment = createAssignment(names, permutation);
    const rating = rate(assignment);

    if (newAssignmentFound(topAssignments, rating)) {
      topAssignments.push({ rating, assignment });
      topAssignments = getTopAssignments(topAssignments);
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

const newAssignmentFound = (topAssignments, rating) => {
  return topAssignments.length < resultLength || rating > getWorstRating(topAssignments);
};

const getWorstRating = assignments => {
  const worst = _.last(assignments) || { rating: 0 };
  return worst.rating;
};

const getTopAssignments = assignments => {
  return _(assignments)
    .orderBy('rating', 'desc')
    .take(resultLength)
    .value();
};
