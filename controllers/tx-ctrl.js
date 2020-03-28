const Tx = require('../models/tx-model')
const request = require('request')

createTx = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a transaction.',
        })
    }

    const tx = new Tx(body)

    if (!tx) {
        return res.status(400).json({ success: false, error: err })
    }

    tx
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: tx._id,
                tx: tx.transaction,
                message: 'Transaction info stored!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Error saving transaction info!',
            })
        })
}

updateTx = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Tx.findOne({ transaction: req.params.id }, (err, block) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Tx not found!',
            })
        }
        tx.signature = body.signature
        tx.type = body.type
        tx.height = body.height
        tx
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: tx.height,
                    tx: tx.transaction,
                    message: 'Transaction updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Transaction not updated!',
                })
            })
    })
}

getTxId = async (req, res) => {
    await Tx.findOne({ transaction: req.params.id }, (err, tx) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!tx) {
            return res
                .status(404)
                .json({ success: false, error: `Transaction not found!` })
        }
        return res.status(200).json({ success: true, data: tx })
    }).catch(err => console.log(err))
}

getTxs = async (req, res) => {
    await Tx.find({}, (err, txs) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!txs.length) {
            return res
                .status(404)
                .json({ success: false, error: `Transaction not found` })
        }
        return res.status(200).json({ success: true, data: txs })
    }).catch(err => console.log(err))
}

module.exports = {
    createTx,
    updateTx,
    getTxId,
    getTxs,
}
