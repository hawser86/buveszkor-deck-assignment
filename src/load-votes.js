const fs = require('fs');
const parse = require('csv-parse/lib/sync');
const { defaultTo, without, zipObject } = require('lodash');

const DEFAULT_VALUE = 5;

module.exports = filePath => {
  const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });
  const parsedVotes = parse(fileContent, { columns: true, cast: true, relax_column_count: true });
  const columns = parseColumns(fileContent);
  const keys = columns.map(questionToKey);
  return parsedVotes
    .map(vote => {
      const values = columns.map(column => defaultTo(vote[column], DEFAULT_VALUE));
      return zipObject(keys, values);
    });
};

const parseColumns = fileContent => {
  const [parsedColumns] = parse(fileContent, { columns: false, cast: true, from_line: 1, to_line: 1 });
  return without(parsedColumns, 'Időbélyeg');
};

const questionToKey = question => {
  switch (question) {
    case 'Hogy hívnak?': return 'name';
    case 'Mennyire szeretnél rákerülni a következő lapra: pikk király': return 'KS';
    case 'Mennyire szeretnél rákerülni a következő lapra: pikk dáma': return 'QS';
    case 'Mennyire szeretnél rákerülni a következő lapra: pikk jumbó': return 'JS';
    case 'Mennyire szeretnél rákerülni a következő lapra: kőr király': return 'KH';
    case 'Mennyire szeretnél rákerülni a következő lapra: kőr dáma': return 'QH';
    case 'Mennyire szeretnél rákerülni a következő lapra: kőr jumbó': return 'JH';
    case 'Mennyire szeretnél rákerülni a következő lapra: treff király': return 'KC';
    case 'Mennyire szeretnél rákerülni a következő lapra: treff dáma': return 'QC';
    case 'Mennyire szeretnél rákerülni a következő lapra: treff jumbó': return 'JC';
    case 'Mennyire szeretnél rákerülni a következő lapra: káró király': return 'KD';
    case 'Mennyire szeretnél rákerülni a következő lapra: káró dáma': return 'QD';
    case 'Mennyire szeretnél rákerülni a következő lapra: káró jumbó': return 'JD';
  }
};
