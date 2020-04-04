const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Peer = new Schema(
    {
        peers: [{
            address: { type: String, required: true },
            blockchainState: { type: String, required: false },
            services: {
            },
            version: { type: String, required: true },
            application: { type: String, required: true },
            state: { type: Boolean, required: false },
            platform: { type: String, required: true },
            announcedAddress: { type: String, required: false },
        }]
    })

module.exports = mongoose.model('peers', Peer)
