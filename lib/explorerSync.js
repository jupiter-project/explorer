const config =require('../config')
const axios = require('axios')
const Block = require('../models/block-model')
const colors = require('colors');

const url = `${ config.api.host }:${ config.api.port }${ config.api.prefix }`
const getBlockchainStatus = `${ config.jupNode.host }:${ config.jupNode.port }/nxt?=%2Fnxt&requestType=getBlockchainStatus`

console.log(getBlockchainStatus)

var i = 0
var v = 0

async function sync() {
    await axios.get(getBlockchainStatus)
    .then(async function(response) {
        var currentHeight = response.data.numberOfBlocks
        console.log('Current blockchain height - '.magenta, currentHeight)
          await axios.get('http://localhost:3030/api/blocks/last')
          .then(async function(res) {
            var blocks = res.data.data[0].height
            console.log('Current db height - '.red, blocks)
        if(blocks < currentHeight) {
          i = blocks + 1
    do {
    await axios.get('http://localhost:7876/nxt?=%2Fnxt&requestType=getBlock&height='+i)
      .then(async function(response) {
        var blockInfo = response.data
        var acct = response.data.generatorRS
        var t = response.data.transactions
        await axios.post('http://localhost:3030/api/block/',blockInfo)
          .then(async function(response0) {
            console.log('POST blockInfo to db', response0.data.id, response0.data.height)
          })
          .catch(function(error) {
            console.log(error.response.data.error.errmsg)
          })
          await axios.get('http://localhost:7876/nxt?=%2Fnxt&requestType=getAccount&account='+acct)
            .then(async function(acctResponse0) {
              var acctInfo = acctResponse0.data
              await axios.post('http://localhost:3030/api/account/', acctInfo)
              await axios.put('http://localhost:3030/api/account/'+acct, acctInfo)
            .then(async function(acctResponse1) {
              console.log('This block height', response.data.height)
              console.log('Store this block\'s forging account'.cyan, acctResponse1.data.account)
            })
            .catch(function(error) {
              console.log(error.response.data.error.errmsg)
            })
            v = 0
            do {
              await axios.get('http://localhost:7876/nxt?=%2Fnxt&requestType=getTransaction&transaction='+t[v])
              .then(async function(response0) {
                  if(response0.data.errorDescription != 'Incorrect "transaction"' || response0.data.transaction != null) {
                      var txInfo = response0.data;
                      var txRecAcct = txInfo.recipientRS
                      var txSendAcct = txInfo.senderRS
                          await axios.post('http://localhost:3030/api/tx/', txInfo)
                           .then(async function() {
                            console.log('This TXs\' tx and rx accounts'.yellow, txSendAcct, txRecAcct)
                            await axios.get('http://localhost:7876/nxt?=%2Fnxt&requestType=getAccount&account='+txRecAcct)
                              .then(async function(acctResponse0) {
                                var acctInfo = acctResponse0.data
                                await axios.post('http://localhost:3030/api/account/', acctInfo)
                                await axios.put('http://localhost:3030/api/account/'+txRecAcct, acctInfo)
                              .catch(function(error) {
                                console.log(error.response.data.error.errmsg)
                              })
                              await axios.get('http://localhost:7876/nxt?=%2Fnxt&requestType=getAccount&account='+txSendAcct)
                              .then(async function(acctResponse0) {
                                var acctInfo = acctResponse0.data
                                await axios.post('http://localhost:3030/api/account/', acctInfo)
                                await axios.put('http://localhost:3030/api/account/'+txSendAcct, acctInfo)
                                  .catch(function(error) {
                                  console.log(error.response.data.error.errmsg)
                                })
                          })
                      }) 
                    })
                  }
                })
              .catch(function(error) {
                console.log(error.response.data.error.errmsg)
              })
              v++
            }
            while(v < t.length)
          })
      .catch(function(error) {
        console.log(error.response.data.error.errmsg)
      })
    })
    i++
    }
    while(i <= currentHeight)
  }
})
})
}
sync()