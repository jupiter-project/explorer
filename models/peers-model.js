const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Peer = new Schema(
    {
        peers: { type: [String], reqired: true },
    })

module.exports = mongoose.model('peers', Peer)
