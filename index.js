const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db')
const blockRouter = require('./routes/block-router')
const txRouter = require('./routes/tx-router')
const accountRouter = require('./routes/account-router')
const peerRouter = require('./routes/peers-router')
const generatorRouter = require('./routes/generators-router')
const utilsRouter = require('./routes/utils-router')

const app = express()
const apiPort = 3030

// Get MongoClient
var MongoClient = require('mongodb').MongoClient;

// Genesis time for correct timestamps
var genesisDate = new Date("10/21/2017 18:19:28");
var genesisEpoch = genesisDate.getTime()/1000.0;

// db connection info
const dburl = 'mongodb://localhost:27017';
const dbname = 'explorer';
const collname = 'blocks';

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

// Connect to MongoDB
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
  // connect to DB
   MongoClient.connect(dburl, { useUnifiedTopology: true }, function(err, client) {
    if (!err) {

      // Get db
      const db = client.db(dbname);

      // Get collection
      const collection = db.collection(collname);

      // Find all documents in the collection
      collection.find({}).toArray(function(err, blocks) {
        if (!err) {
          // close db client
          client.close();
        }
      })
    }
  })
})
app.use('/api', blockRouter, txRouter, accountRouter, peerRouter, generatorRouter, utilsRouter)

app.listen(apiPort, () => console.log(`Jupiter Explorer running on port ${apiPort}`))
