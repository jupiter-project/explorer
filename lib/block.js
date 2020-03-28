const axios = require('axios')
const JRS = require('./jrs-api')
const Block = require('../models/block-model')
const Tx = require('../models/tx-model')
const API = new JRS.API('https://status.gojupiter.tech')
const Promise = require('bluebird')
const http = require('http')

/*
How to get the 'start', 'stop' and check if db is clean?
How to grab transactionID and use tx-model to store?
Do we need to the locker method?
for(let height = start; height <= stop; height++) {
*/
async function exec() { const blockInfo = await API.getBlock()

  const data = JSON.stringify({
    "previousBlockHash": blockInfo.previousBlockHash,
    "payloadLength": blockInfo.payloadLength,
    "totalAmountNQT": blockInfo.totalAmountNQT,
    "generatorSignature": blockInfo.generatorSignature,
    "generator": blockInfo.generator,
    "generatorPublicKey": blockInfo.generatorPublicKey,
    "baseTarget": blockInfo.baseTarget,
    "payloadHash": blockInfo.payloadHash,
    "generatorRS": blockInfo.generatorRS,
    "nextBlock": blockInfo.nextBlock,
    "requestProcesingTime": blockInfo.requestProcessingTime,
    "numberOfTransactions": blockInfo.numberOfTransactions,
    "blockSignature": blockInfo.blockSignature,
    "transactions": blockInfo.transactions,
    "version": blockInfo.version,
    "totalFeeNQT": blockInfo.totalFeeNQT,
    "previousBlock": blockInfo.previousBlock,
    "cumulativeDifficulty": blockInfo.cumulativeDifficulty,
    "block": blockInfo.block,
    "height": blockInfo.height,
    "timestamp": blockInfo.timestamp,
  })

await axios.post('http://localhost:3030/api/block/',blockInfo)
.then(function (response) {
  console.log(response.data.id, response.data.height)
  process.exit
})
.catch(function(error) {
})
}

exec()
