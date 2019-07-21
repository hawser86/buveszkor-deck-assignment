const findBestAssignment = require('../src/find-best-assignment');
const yargs = require('yargs')
  .usage('Usage: $0 --file [path]')
  .demandOption(['file'])
  .option('file', {
    type: "string",
    alias: 'f',
    describe: 'path to csv exported from Google Form'
  });

try {
  const { file } = yargs.argv;
  const startTime = Date.now();
  const bestAssignments = findBestAssignment(file);

  for (const assignment of bestAssignments) {
    console.log(`=== Rating: ${assignment.rating} ===`);
    for (const pair of assignment.assignment) {
      console.log(`  ${pair.name}: ${pair.card}`);
    }
  }

  const duration = (Date.now() - startTime) / 1000;
  console.log(`Duration: ${duration} sec`);
} catch (e) {
  console.error('baj van :(');
  console.error(e);
}