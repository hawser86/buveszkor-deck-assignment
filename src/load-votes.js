const fs = require('fs');
const parse = require('csv-parse/lib/sync');

module.exports = filePath => {
  const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });
  const parsedVotes = parse(fileContent, { columns: true });

  return parsedVotes.map(vote => ({
    name: vote['Hogy hívnak?'],
    KS: parseInt(vote['Mennyire szeretnél rákerülni a következő lapra: pikk király'], 10),
    QS: parseInt(vote['Mennyire szeretnél rákerülni a következő lapra: pikk dáma'], 10),
    JS: parseInt(vote['Mennyire szeretnél rákerülni a következő lapra: pikk jumbó'], 10),
    KH: parseInt(vote['Mennyire szeretnél rákerülni a következő lapra: kőr király'], 10),
    QH: parseInt(vote['Mennyire szeretnél rákerülni a következő lapra: kőr dáma'], 10),
    JH: parseInt(vote['Mennyire szeretnél rákerülni a következő lapra: kőr jumbó'], 10),
    KC: parseInt(vote['Mennyire szeretnél rákerülni a következő lapra: treff király'], 10),
    QC: parseInt(vote['Mennyire szeretnél rákerülni a következő lapra: treff dáma'], 10),
    JC: parseInt(vote['Mennyire szeretnél rákerülni a következő lapra: treff jumbó'], 10),
    KD: parseInt(vote['Mennyire szeretnél rákerülni a következő lapra: káró király'], 10),
    QD: parseInt(vote['Mennyire szeretnél rákerülni a következő lapra: káró dáma'], 10),
    JD: parseInt(vote['Mennyire szeretnél rákerülni a következő lapra: káró jumbó'], 10)
  }));
};
