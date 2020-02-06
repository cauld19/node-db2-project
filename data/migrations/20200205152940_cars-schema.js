
exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
      tbl.increments();
      tbl.text('make', 128).notNullable();
      tbl.text('model', 128).notNullable();
      tbl.integer('VIN').notNullable();
      tbl.integer('mileage').notNullable();
      tbl.text('transmission type', 128);
      tbl.text('status of title', 128);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars');
};
