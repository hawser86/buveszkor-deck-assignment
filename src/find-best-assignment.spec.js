const findBestAssignment = require('./find-best-assignment');
const loadVotes = require('./load-votes');

jest.mock('./load-votes');

describe('findBestAssignment', function () {
  beforeEach(() => {
    const testVotes = [
      { name: 'Bűvész Béla', KS: 10, QS: 0, JS: 6, KH: 5 },
      { name: 'Fakír Feri', KS: 1, QS: 10, JS: 7, KH: 5 },
      { name: 'Mentalista Márk', KS: 1, QS: 5, JS: 10, KH: 5 },
      { name: 'Varázsló Vili', KS: 8, QS: 1, JS: 2, KH: 10 }
    ];
    loadVotes.mockImplementation(() => testVotes);
  });

  it('should load votes from give path', function () {
    findBestAssignment('file/to/path');
    expect(loadVotes).toHaveBeenCalledWith('file/to/path');
  });

  it('should return 10 assignments', function () {
    const result = findBestAssignment();
    expect(result).toHaveLength(10);
  });

  it('should return best assignment as 1st', function () {
    const result = findBestAssignment();
    expect(result[0]).toEqual({
      rating: 40,
      assignment: [
        { name: 'Bűvész Béla', card: 'KS', point: 10 },
        { name: 'Fakír Feri', card: 'QS', point: 10 },
        { name: 'Mentalista Márk', card: 'JS', point: 10 },
        { name: 'Varázsló Vili', card: 'KH', point: 10 }
      ]
    });
  });
});
