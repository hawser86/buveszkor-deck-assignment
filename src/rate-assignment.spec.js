const rateAssignment = require('./rate-assignment');

describe('rateAssignment', function () {
  it('should return the sum of the proper votes', function () {
    const votes = [
      { name: 'Bűvész Béla', KS: 10, QS: 0, JS: 6 },
      { name: 'Mentalista Márk', KS: 1, QS: 5, JS: 7 },
      { name: 'Varázsló Vili', KS: 8, QS: 1, JS: 2 }
    ];

    const assignment = [
      { name: 'Bűvész Béla', card: 'KS' },
      { name: 'Mentalista Márk', card: 'QS' },
      { name: 'Varázsló Vili', card: 'JS' }
    ];

    const rating = rateAssignment(votes)(assignment);

    expect(rating).toEqual(17);
  });
});
