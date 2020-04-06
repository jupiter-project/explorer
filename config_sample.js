/* Global config settings */

const config = {
  'api': {
    'host': 'http://localhost',
    'port': '3030',
    'prefix': '/api',
    'timeout': 5000 // 5 seconds
  },
  'nomics': {
    'api': 'https://api.nomics.com/v1',
    'key': '/currencies/ticker?key=Get a key for free at nomics',
    'ticker': '&ids=JUP&interval=1d'
  },
  'db': {
    'host': '127.0.0.1',
    'port': '27017',
    'name': 'explorer',
    'user': 'jup',
    'pass': 'iter'
  },
  'jupNode': {
    'host': '127.0.0.1',
    'port': '7876',
    'timeout': 5000 // 5 seconds
  }
}

module.exports = config