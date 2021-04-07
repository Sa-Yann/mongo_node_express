var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'MongoDB avec Express/node.js' });
});

// Code Step 1 : Confirmation de connection a la base de donnéee en  localhost:27017
// import { MongoClient } from 'mongodb'
let MongoClient = require('mongodb');

async function connect () {
  // Connection URL
  const url = 'mongodb://localhost:27017/turlututu'

  let db

  try {
    db = await MongoClient.connect(url)
    console.log('Connected successfully!')
  } catch (err) {
    // on rajoute un console.log(err) pour afficher les erreurs si pas de connectoin
    console.log(err);
    // Handle error
  }

  return db
}

connect();

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



module.exports = router;
