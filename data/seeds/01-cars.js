
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {VIN: 12345, make: 'ford', model: 'T', mileage: 2000, transmissionType: "Auto", statusOfTitle: "clean"},
        {VIN: 5555, make: 'chevy', model: 'taurus', mileage: 3000, transmissionType: "Manual", statusOfTitle: "wrecked"}
      ]);
    });
};
