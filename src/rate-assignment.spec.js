const rateAssignment = require('./rate-assignment');

describe('rateAssignment', function () {
  it('should return the sum of the proper votes', function () {
    const votesByName = {
      'Bűvész Béla': { KS: 10, QS: 0, JS: 6 },
      'Mentalista Márk': { KS: 1, QS: 5, JS: 7 },
      'Varázsló Vili': { KS: 8, QS: 1, JS: 2 }
    };

    const assignment = [
      { name: 'Bűvész Béla', card: 'KS' },
      { name: 'Mentalista Márk', card: 'QS' },
      { name: 'Varázsló Vili', card: 'JS' }
    ];

    const rating = rateAssignment(votesByName, assignment);

    expect(rating).toEqual({ sum: 17 });
  });
});
