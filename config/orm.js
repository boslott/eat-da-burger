
//  Import MySQL connection
const connection = require('./connection');

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

// Object for all our SQL statement functions.

const orm = {
  all: (tableInput, callback) => {
    let queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, (err, result) => {
      if(err) throw err;
      callback(result);
    });
  },
  createOne: (table, cols, vals, callback) => {
    console.log('beginning to createOne');
    let queryString = "INSERT INTO " + table;

    queryString += " SET ?";
    // queryString += cols.toString();
    // queryString += ") ";
    // queryString += "VALUES (";
    // queryString += printQuestionMarks(vals.length);
    // queryString += ") ";

    console.log('queryString = ' + queryString);

    connection.query(queryString,
      {
        burger_name:  vals,
        devoured: false
      }, (err, result) => {
      if (err) throw err;
      callback(result);
    });
  },
  updateOne: (table, objColVals, condition, callback) => {
    // console.log(req);
    let queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objColVals;
    queryString += " WHERE id = ";
    queryString += condition;

    console.log('queryString = ' + queryString);
    connection.query(queryString, condition, (err, results) => {
      if (err) throw err;
      callback(results);
    });
  },
  delete: (table, condition, callback) => {
    let queryString = "DELETE FROM " + table;
    queryString += " WHERE " + condition;

    connection.query(queryString, (err, results) => {
      if (err) throw err;
      callback(results);
    });
  }
};


module.exports = orm;



//  Export the orm object in module.exports
