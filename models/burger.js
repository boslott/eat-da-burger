
const orm = require('../config/orm');


const burger = {
  all: function(callback) {
    orm.all('burgers', res => {
      callback(res);
    });
  },
  createOne: (cols, vals, callback) => {
    orm.createOne('burgers', cols, vals, results => {
      callback(results);
    });
  },
  updateOne: (objColVals, condition, callback) => {
    orm.updateOne('burgers', objColVals, condition, results => {
      callback(results);
    });
  },
  deleteOne: (condition, callback) => {
    orm.delete('burgers', condition, res => {
      callback(res);
    });
  }
};

module.exports = burger;
