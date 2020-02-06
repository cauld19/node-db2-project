const db = require('../data/db-config.js');

module.exports = {
    get,
    insert,
    getById,
    remove,
    update
};

function get() {
    return db('cars')
};

function getById(id) {
    return db('cars')
      .where({ id })
      .first();
};

function insert(car) {
    return db('cars')
      .insert(car)
      .then(ids => {
        return getById(ids[0]);
      });
};


function remove(id) {
    return db('cars')
      .where('id', id)
      .del();
  }

function update(id, changes) {
    return db('cars')
      .where({ id })
      .update(changes);
  }



