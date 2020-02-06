const db = require('../data/db-config.js');

module.exports = {
    get,
    insert,
    getById
};

function get() {
    return db('cars')
}

function getById(id) {
    return db('cars')
      .where({ id })
      .first();
  }

function insert(car) {
    return db('cars')
      .insert(car)
      .then(ids => {
        return getById(ids[0]);
      });
  }