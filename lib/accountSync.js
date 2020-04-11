const axios = require('axios')
var colors = require('colors')

var i = 0

async function sync() {
  do {
    await axios.get('http://localhost:7876/nxt?=%2Fnxt&requestType=getBlock&height='+i)
    .then(async function(acctResponse) {
      var acct = acctResponse.data.generatorRS;
        await axios.get('http://localhost:7876/nxt?=%2Fnxt&requestType=getAccount&account='+acct)
        .then(async function(acctResponse0) {
          var acctInfo = acctResponse0.data;
            await axios.put('http://localhost:3030/api/account/', acctInfo)
            .then(async function(acctResponse1) {
                console.log(acctResponse1.data.id, acctResponse1.data.account)
                console.log(acctResponse.data.height)
            })
            .catch(function(error) {
              console.log('console 1'.red, error.response.data.error.errmsg)
            })      
          })
    i++
    console.log('here', i)
    })
  }
  while(i <= accounts.length)
}
sync()