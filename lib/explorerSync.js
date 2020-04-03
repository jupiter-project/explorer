const axios = require('axios')
const Block = require('../models/block-model')

var i = 0
var v = 0

async function sync() {
    await axios.get('http://localhost:7876/nxt?=%2Fnxt&requestType=getBlockchainStatus')
    .then(async function(response) {
        var currentHeight = response.data.numberOfBlocks
        console.log(currentHeight)
          // Find last block in our local db
          await axios.get('http://localhost:3030/api/blocks/last')
          .then(async function(res) {
            var blocks = res.data.data[0].height
            console.log(blocks)
        if(blocks < currentHeight) {
          i = blocks
    do {
    await axios.get('http://localhost:7876/nxt?=%2Fnxt&requestType=getBlock&height='+i)
      .then(async function(response) {
        var blockInfo = response.data
        var acct = response.data.generatorRS
        var t = response.data.transactions
        await axios.post('http://localhost:3030/api/block/',blockInfo)
          .then(async function(response0) {
            console.log(response0.data.id, response0.data.height)
          })
          .catch(function(error) {
            console.log(error.response.data.error.errmsg)
          })
          await axios.get('http://localhost:7876/nxt?=%2Fnxt&requestType=getAccount&account='+acct)
            .then(async function(acctResponse0) {
              var acctInfo = acctResponse0.data
              await axios.post('http://localhost:3030/api/account/', acctInfo)
            .then(async function(acctResponse1) {
                console.log(acctResponse1.data.id, acctResponse1.data.account)
                console.log(response.data.height)
            })
            .catch(function(error) {
              console.log('console 1', error.response.data.error.errmsg)
            })
            v = 0
            do {
              await axios.get('http://localhost:7876/nxt?=%2Fnxt&requestType=getTransaction&transaction='+t[v])
              .then(async function(response0) {
                  if(response0.data.errorDescription != 'Incorrect "transaction"') {
                      console.log('Tx console', v)
                      var txInfo = response0.data;
                          await axios.post('http://localhost:3030/api/tx/', txInfo)
                          .then(async function(response1) {
                              console.log(response1.data.id, response1.data)
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