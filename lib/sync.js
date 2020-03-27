const axios = require('axios')
const JRS = require('./jrs-api')
const Block = require('../models/block-model')
const API = new JRS.API('https://status.gojupiter.tech')
const Promise = require('bluebird')
const http = require('http')

var i = 1176380

async function height() {

do {
await axios.get('https://status.gojupiter.tech/nxt?=%2Fnxt&requestType=getBlock&height='+i)
  .then(async function(response) {
    var blockInfo = response.data
    await axios.post('http://localhost:3030/api/block/',blockInfo)
      .then(async function(response0) {
        console.log(response0.data.id, response0.data.height)
      })
      .catch(function(error) {
        console.log(error.response.data.error.errmsg)
      })
  })
  .catch(function(error) {
    console.log(error.response.data.error.errmsg)
  })
i++
}
while(i <= 1176430)
}
height()
k
