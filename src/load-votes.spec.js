const fs = require('fs');
const loadVotes = require('./load-votes');

jest.mock('fs');

describe('loadVotes', function () {
  describe('when all columns are filled', function () {
    beforeEach(() => {
      const testFileContent =
        `"Időbélyeg","Hogy hívnak?","Mennyire szeretnél rákerülni a következő lapra: pikk király","Mennyire szeretnél rákerülni a következő lapra: pikk dáma","Mennyire szeretnél rákerülni a következő lapra: pikk jumbó","Mennyire szeretnél rákerülni a következő lapra: kőr király","Mennyire szeretnél rákerülni a következő lapra: kőr dáma","Mennyire szeretnél rákerülni a következő lapra: kőr jumbó","Mennyire szeretnél rákerülni a következő lapra: treff király","Mennyire szeretnél rákerülni a következő lapra: treff dáma","Mennyire szeretnél rákerülni a következő lapra: treff jumbó","Mennyire szeretnél rákerülni a következő lapra: káró király","Mennyire szeretnél rákerülni a következő lapra: káró dáma","Mennyire szeretnél rákerülni a következő lapra: káró jumbó"
        "2019/07/16 7:06:19 du. EET","Bűvész Béla","10","0","6","8","0","4","10","0","6","8","0","4"
        "2019/07/16 7:11:57 du. EET","Varázsló Vili","8","1","2","10","1","7","7","0","2","5","0","3"`
          .split('\n').map(l => l.trim()).join('\n');
      fs.readFileSync.mockReturnValue(testFileContent);
    });

    it('should load file from given path', function () {
      loadVotes('path/to/file');
      expect(fs.readFileSync).toHaveBeenCalledWith('path/to/file', { encoding: 'utf-8' });
    });

    it('should return parsed votes', function () {
      const votes = loadVotes('');
      expect(votes).toEqual([
        { name: 'Bűvész Béla', KS: 10, QS: 0, JS: 6, KH: 8, QH: 0, JH: 4, KC: 10, QC: 0, JC: 6, KD: 8, QD: 0, JD: 4 },
        { name: 'Varázsló Vili', KS: 8, QS: 1, JS: 2, KH: 10, QH: 1, JH: 7, KC: 7, QC: 0, JC: 2, KD: 5, QD: 0, JD: 3 }
      ]);
    });
  });

  describe('when some columns are not filled', function () {
    beforeEach(() => {
      const testFileContent =
        `"Időbélyeg","Hogy hívnak?","Mennyire szeretnél rákerülni a következő lapra: pikk király","Mennyire szeretnél rákerülni a következő lapra: pikk dáma","Mennyire szeretnél rákerülni a következő lapra: pikk jumbó"
        "2019/07/16 7:06:19 du. EET","Bűvész Béla","10","0","6"
        "2019/07/16 7:11:57 du. EET","Mentalista Márk","8","1"
        "2019/07/16 7:11:57 du. EET","Varázsló Vili"`
          .split('\n').map(l => l.trim()).join('\n');
      fs.readFileSync.mockReturnValue(testFileContent);
    });

    it('should fill missing values with 5', function () {
      const votes = loadVotes('');
      expect(votes).toEqual([
        { name: 'Bűvész Béla', KS: 10, QS: 0, JS: 6},
        { name: 'Mentalista Márk', KS: 8, QS: 1, JS: 5},
        { name: 'Varázsló Vili', KS: 5, QS: 5, JS: 5 }
      ]);
    });
  });
});
