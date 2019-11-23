const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db')
const blockRouter = require('./routes/block-router')
const txRouter = require('./routes/tx-router')

const app = express()
const apiPort = 3000

// Get MongoClient
var MongoClient = require('mongodb').MongoClient;

// db connection info
const dburl = 'mongodb://localhost:27017';
const dbname = 'explorer';
const collname = 'txs';

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
      collection.find({}).toArray(function(err, txs) {
        if (!err) {

          // write HTML output
          var output = '<html><header><title>Tx List from DB</title></header><body>';
          output += '<h1>Tx List retrieved from DB</h1>';
          output += '<table border="1"><tr><td><b>' + 'Transaction' + '</b></td><td><b>' + 'Block Hash' + '</b></td></tr>';

          // process tx list
          txs.forEach(function(tx){
            output += '<tr><td><a href="https://status.gojupiter.tech/nxt?=%2Fnxt&requestType=getTransaction&transaction='+tx.transaction+'">' + tx.transaction + '</a></td><td>' + tx.block + '</td></tr>';
          });

          // write HTML output (ending)
          output += '</table></body></html>'

          // send output back
          res.send(output);
        }
      });

      // close db client
      client.close();
    }
  });
})

app.use('/api', blockRouter, txRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
