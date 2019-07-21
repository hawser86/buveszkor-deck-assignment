const fs = require('fs');
const parse = require('csv-parse/lib/sync');
const { defaultTo } = require('lodash');

module.exports = filePath => {
  const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });
  const parsedVotes = parse(fileContent, { columns: true, cast: true, relax_column_count: true });

  const defaultValue = 5;
  return parsedVotes.map(vote => ({
    name: vote['Hogy hívnak?'],
    KS: defaultTo(vote['Mennyire szeretnél rákerülni a következő lapra: pikk király'], defaultValue),
    QS: defaultTo(vote['Mennyire szeretnél rákerülni a következő lapra: pikk dáma'], defaultValue),
    JS: defaultTo(vote['Mennyire szeretnél rákerülni a következő lapra: pikk jumbó'], defaultValue),
    KH: defaultTo(vote['Mennyire szeretnél rákerülni a következő lapra: kőr király'], defaultValue),
    QH: defaultTo(vote['Mennyire szeretnél rákerülni a következő lapra: kőr dáma'], defaultValue),
    JH: defaultTo(vote['Mennyire szeretnél rákerülni a következő lapra: kőr jumbó'], defaultValue),
    KC: defaultTo(vote['Mennyire szeretnél rákerülni a következő lapra: treff király'], defaultValue),
    QC: defaultTo(vote['Mennyire szeretnél rákerülni a következő lapra: treff dáma'], defaultValue),
    JC: defaultTo(vote['Mennyire szeretnél rákerülni a következő lapra: treff jumbó'], defaultValue),
    KD: defaultTo(vote['Mennyire szeretnél rákerülni a következő lapra: káró király'], defaultValue),
    QD: defaultTo(vote['Mennyire szeretnél rákerülni a következő lapra: káró dáma'], defaultValue),
    JD: defaultTo(vote['Mennyire szeretnél rákerülni a következő lapra: káró jumbó'], defaultValue)
  }));
};
