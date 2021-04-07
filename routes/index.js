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
  // insertDocuments (db) est executé dans parallele pour utiliser le promise.all
  // insertDocuments (db)
  parallel(db, client)
// CLient.colse() ferme la conncetionavant trop tot dc o comment ds un 1er temps
  // client.close();
});

  const parallel = async function (db,client){
    console.log(`Fonction d'execution en parallele avec await Promise.all==`);
    //  Démarer plusiseurs taches en parallele et on reste ouvert tant qu ece n est pas fini
    await Promise.all([
      insertDocuments (db, 1),
      insertDocuments (db, 2),
      insertDocuments (db, 3),
      indexCollection (db),
      findDocuments (db),
      insertDocuments (db, 4),
      insertDocuments (db, 5)
    ]);
    console.log(`fin d'execution du promise.all`);
    client.close();
    console.log(`client.close() cloture la connexion une fois les tâches accomplies`)
  };

// fonction async insertDocument
async function insertDocuments (db ,nomDuDoc) {
  // Get the documents collection
  const collection = db.collection('testcollection');

  console.log(`lancemeant de la demande du Document ${nomDuDoc}`)

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

  console.log(`un console log dans le document ${nomDuDoc} pour montrer qud il est éxecuté`);

  return result
}
// Fonction Query de récupération de toutes les données de la Bdd
async function findDocuments (db) {
  const collection = db.collection('testcollection')

  const docs = await collection.find({}).toArray()

  console.log('Found the following records')
  console.log(docs)

  return docs
}

// building an index on the name field with sort order ascending
async function indexCollection (db) {
  const collection = db.collection('New-collection')
  try {
    const result = await collection.createIndex({
      gender: 1
      
    })
    console.log(gender);
    return result
  } catch (error) {
    console.log(error);
  }
  
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
