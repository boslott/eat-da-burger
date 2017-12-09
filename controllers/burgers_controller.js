
const express = require('express');

//  Create the router for the app and export the router at the end of the file

const router = express.Router();

//  Import the model (burger.js) to use its database functions
const burger = require('../models/burger');

//  Create all the routes and set up the logic within those routes where required
router.get('/', (req, res) => {
  burger.all(data => {
    let hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render('index', hbsObject);
  });
});

router.post('/api/burgers', (req, res) => {
  burger.createOne('burger_name', req.body.name, results => {
    console.log(results.insertId);
    console.log('results = ', results);
    res.json({ id: results.insertId });
  });
});

router.put('/api/burgers/:id', (req, res) => {
  let newState = 'devoured = ' + req.body.devoured;

  burger.updateOne(newState, req.params.id, results => {
    if (results.changedRows == 0) {
      console.log('oh no');
      // res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete('/api/burgers/:id', (req, res) => {
  let condition = 'id = ' + req.params.id;

  burger.deleteOne(condition, result => {
    if(result.affectedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

module.exports = router;
