const { keyBy } = require('lodash');
const findBestAssignment = require('../src/find-best-assignment');
const yargs = require('yargs')
  .usage('Usage: $0 --file [path]')
  .demandOption(['file'])
  .option('file', {
    type: 'string',
    alias: 'f',
    describe: 'path to csv exported from Google Form'
  })
  .option('result-length', {
    type: 'number',
    alias: 'l',
    describe: 'the number of result collected',
    default: 10
  })
  .option('maximum-difference', {
    type: 'number',
    alias: 'm',
    describe: 'maximum difference allowed between the points of two assigned cards',
    default: 5
  });

try {
  const { file, resultLength, maximumDifference } = yargs.argv;

  const bestAssignments = findBestAssignment({
    pathToVotes: file,
    resultLength: resultLength,
    maxDiffThreshold: maximumDifference
  });

  const names = bestAssignments[0].assignment.map(a => a.name);
  console.log(`${names.join(',')},sum,maximum difference`);
  bestAssignments.forEach(assignment => {
    const cardsByName = keyBy(assignment.assignment, 'name');
    const cardsWithPoints = names.map(name => `${cardsByName[name].card} (${cardsByName[name].point})`);
    console.log(`${cardsWithPoints.join(',')},${assignment.rating.sum},${assignment.rating.maxDiff}`);
  });
} catch (e) {
  console.error('baj van :(');
  console.error(e);
}
