var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'MongoDB avec Express/node.js' });
});



// // Code Step 3 : Rajouts de la fonctio insertDocument pourrajouter des lements ala table `testcollection'
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// const insertDocuments = require('../javascripts/insertDocuments.js')
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
  // on test insertDocuments en mettant bien le parametre db
  insertDocuments (db)
// CLient.colse() ferme la conncetionavant trop tot dc o comment ds un 1er temps
  // client.close();
});

// fonction async insertDocument
async function insertDocuments (db) {
  // Get the documents collection
  const collection = db.collection('testcollection')

  // Insert some documents
  const result = await collection.insertMany([
    {
      name: 'Sun Bakery Trattoria',
      stars: 4,
      categories: [
        'Pizza', 'Pasta', 'Italian', 'Coffee', 'Sandwiches'
      ]
    }, {
      name: 'Blue Bagels Grill',
      stars: 3,
      categories: [
        'Bagels', 'Cookies', 'Sandwiches'
      ]
    },
    {
      id:220, 
      first_name:"Saiyann",
      last_name:"Grammer",
      email:"saiyann0@columbia.edu",
      gender:"Maler",
      ip_address:"20.135.156.90",
      Couleur_shirt:"Purple",
    }
  ])

  return result
}

// // Code Step 2: Connect to MongoDB : https://www.npmjs.com/package/mongodb
// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');

// // Connection URL
// const url = 'mongodb://localhost:27017';

// // Database Name
// const dbName = 'admin';
// // Utilisation du constructeur MongoClient
// // Passer { useUnifiedTopology: true } en argument 
// // pour pouvoir échanger avec le serveur
// const client = new MongoClient(url, { useUnifiedTopology: true });
// // Use connect method to connect to the server
// client.connect(function(err) {
//   assert.strictEqual(null, err);
//   console.log('Connected successfully to server');

//   const db = client.db(dbName);

//   client.close();
// });

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






module.exports = router;
