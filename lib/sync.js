const axios = require('axios')
const JRS = require('./jrs-api')
const Block = require('../models/block-model')
const API = new JRS.API('https://status.gojupiter.tech')
const Promise = require('bluebird')
const http = require('http')

var i = 1061001

async function height() {

do {
await axios.get('https://status.gojupiter.tech/nxt?=%2Fnxt&requestType=getBlock&height='+i)
  .then(async function(response) {
    var blockInfo = response.data
    await axios.post('http://explorer.gojupiter.tech:3000/api/block/',blockInfo)
      .then(async function(response0) {
        console.log(response0.data.id, response0.data.height)
      })
      .catch(function(error) {
        console.log(error)
      })
  })
  .catch(function(error) {
    console.log(error)
  })
i++
}
while(i <= 1061130)
}
height()
/*
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

/*
await axios.post('http://explorer.gojupiter.tech:3000/api/block/',blockInfo)
  .then(function (response) {
    console.log(response.data.id)
    })
  .catch(function(error) {
    console.log(error)
  })*/
//}

//exec()
