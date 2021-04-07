var express = require('express');
var router = express.Router();



// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');

// // Connection URL
// const url = 'mongodb://localhost:27017/';

// // Database Name
// const dbName = 'admin';
// const client = new MongoClient(url);
// // Use connect method to connect to the server
// client.connect(function(err) {
//   assert.strictEqual(null, err);
//   console.log('Connected successfully to server');

//   const db = client.db(dbName);

//   client.close();
// });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'MongoDB avec Express/node.js' });
});

module.exports = router;
