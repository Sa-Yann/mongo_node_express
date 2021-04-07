var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'MongoDB avec Express/node.js' });
});

// // Code Step 1 : Confirmation de connection a la base de donnéee en  localhost:27017
// // link: https://www.mongodb.com/what-is-mongodb
// // import { MongoClient } from 'mongodb'
// let MongoClient = require('mongodb');

// async function connect () {
//   // Connection URL
//   const url = 'mongodb://localhost:27017/'

//   let db

//   try {
//     db = await MongoClient.connect(url)
//     console.log('Connected successfully!')
//   } catch (err) {
//     // on rajoute un console.log(err) pour afficher les erreurs si pas de connectoin
//     console.warning(`verifier que le serveur mngodb est boien installe et lancé dds un second terminal`);
//     console.log(err);
//     // Handle error
//   }

//   return db
// }

// connect();


// Code Step 2: Connect to MongoDB : https://www.npmjs.com/package/mongodb
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'admin';
// Utilisation du constructeur MongoClient
// Passer { useUnifiedTopology: true } en argument 
// pour pouvoir échanger avec le serveur
const client = new MongoClient(url, { useUnifiedTopology: true });
// Use connect method to connect to the server
client.connect(function(err) {
  assert.strictEqual(null, err);
  console.log('Connected successfully to server');

  const db = client.db(dbName);

  client.close();
});



module.exports = router;
