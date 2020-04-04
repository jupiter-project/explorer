const Peer = require('../models/peers-model')
const request = require('request')

recordPeer = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a peer.',
        })
    }

    const peer = new Peer(body)

    if (!body) {
        return res.status(400).json({ success: false, error: err })
    }
    peer
        .save()
        .then(() => {
                return res.status(201).json({
                    success: true,
                    id: peer._id,
                    peer: peer.peers[0],
                    message: 'Peer info stored!',
                })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Error saving peer info!',
            })
        })
}

getPeers = async (req, res) => {

    try {
        const peers = await Peer.find();
        if (!peers.length) {
            return res
                .status(404)
                .json({ success: false, error: `Peers not found` })
        }
        console.log(peers.application)
        if(peers.application != "NRS") {
            return res.status(200).json({ success: true, data: peers, test: 'This is the correct method' })
        }
    } catch (e) {
        console.log(err)
        return res.status(500).json({ success: false, error: err });
    }
}

getPeer = async (req, res) => {
    await Peer.findOne({ peers: req.params.id }, (err, peer) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!peer) {
            return res
                .status(404)
                .json({ success: false, error: `Peer not found!` })
        }
        return res.status(200).json({ success: true, data: peers })
    }).catch(err => console.log(err))
}

module.exports = {
    recordPeer,
    getPeers,
    getPeer,
}
function newFunction(peer) {
    console.log(peer.peers.application)
}

