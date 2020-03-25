const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db')
const blockRouter = require('./routes/block-router')
const txRouter = require('./routes/tx-router')

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

          // write HTML output
          var output = '<html><header><title>Tx List from DB</title></header><body>';
          output += '<h1>Block List retrieved from DB</h1>';
          output += '<table border="1"><tr><td><b>' + 'Block Height' + '</b></td><td><b>' + 'Block Generator' + '</b></td><td><b>' +
                    'Timestamp' + '</b></td><td><b>' + 'Transactions' + '</b></td></tr>';

          // process block list
          blocks.slice(25).forEach(function(block){
            var blockEpoch = block.timestamp + genesisEpoch;
            var blockDate = new Date(blockEpoch*1000);
            output += '<tr><td><a href="https://status.gojupiter.tech/nxt?=%2Fnxt&requestType=getBlock&height='+block.height+'">'
                      + block.height + '</a></td><td>' + block.generator + '</td><td>' + blockDate.toUTCString() + '</td><td>' +
                      block.transactions + '</td></tr>';
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

app.listen(apiPort, () => console.log(`Jupiter Explorer running on port ${apiPort}`))
