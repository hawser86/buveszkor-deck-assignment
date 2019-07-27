const findBestAssignment = require('./find-best-assignment');
const loadVotes = require('./load-votes');

jest.mock('./load-votes');

describe('findBestAssignment', function () {
  describe('when there are 4 votes', function () {
    beforeEach(() => {
      const testVotes = [
        { name: 'Bűvész Béla', KS: 6, QS: 5, JS: 10, KH: 5 },
        { name: 'Fakír Feri', KS: 6, QS: 10, JS: 7, KH: 5 },
        { name: 'Mentalista Márk', KS: 10, QS: 4, JS: 6, KH: 5 },
        { name: 'Varázsló Vili', KS: 8, QS: 5, JS: 7, KH: 10 }
      ];
      loadVotes.mockImplementation(() => testVotes);
    });

    it('should load votes from give path', function () {
      findBestAssignment({ pathToVotes: 'file/to/path' });
      expect(loadVotes).toHaveBeenCalledWith('file/to/path');
    });

    it('should return limited number of assignments', function () {
      const result = findBestAssignment({ pathToVotes: '', resultLength: 5 });
      expect(result).toHaveLength(5);
    });

    it('should return assignments with maxWith less than threshold', function () {
      const results = findBestAssignment({ pathToVotes: '', maxDiffThreshold: 3 });
      results.forEach(result => {
        expect(result.rating.maxDiff).toBeLessThanOrEqual(3);
      });
    });

    it('should return best assignment as 1st', function () {
      const result = findBestAssignment({ pathToVotes: '' });
      expect(result[0]).toEqual({
        rating: { sum: 40, maxDiff: 0 },
        assignment: [
          { name: 'Bűvész Béla', card: 'JS', point: 10 },
          { name: 'Fakír Feri', card: 'QS', point: 10 },
          { name: 'Mentalista Márk', card: 'KS', point: 10 },
          { name: 'Varázsló Vili', card: 'KH', point: 10 }
        ]
      });
    });
  });

  describe('when there are 2 votes', function () {
    beforeEach(() => {
      const testVotes = [
        { name: 'Bűvész Béla', KS: 10, QS: 5 },
        { name: 'Fakír Feri', KS: 4, QS: 1 }
      ];
      loadVotes.mockImplementation(() => testVotes);
    });

    it('should return best assignment with a maxDiff smaller than 5 as 1st', function () {
      const result = findBestAssignment({ pathToVotes: '' });
      expect(result).toEqual([{
        rating: { sum: 9, maxDiff: 1 },
        assignment: [
          { name: 'Bűvész Béla', card: 'QS', point: 5 },
          { name: 'Fakír Feri', card: 'KS', point: 4 }
        ]
      }]);
    });
  });
});
