const Block = require('../models/block-model')
const request = require('request')

createBlock = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a block',
        })
    }

    const block = new Block(body)

    if (!block) {
        return res.status(400).json({ success: false, error: err })
    }

    block
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: block._id,
                height: block.height,
                message: 'Block info stored!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Error saving block info!',
            })
        })
}

updateBlock = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Block.findOne({ height: req.params.id }, (err, block) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Block not found!',
            })
        }
        block.previousBlockHash = body.previousBlockHash
        block.payloadLength = body.payloadLength
        block.totalAmountNQT = body.totalAmountNQT
        block
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: block._id,
                    height: block.height,
                    message: 'Block updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Block not updated!',
                })
            })
    })
}

getBlockId = async (req, res) => {
    await Block.findOne({ height: req.params.id }, (err, block) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!block) {
            return res
                .status(404)
                .json({ success: false, error: `Block not found!` })
        }
        return res.status(200).json({ success: true, data: block })
    }).catch(err => console.log(err))
}

getBlocks = async (req, res) => {

    try {
        const blocks = await Block.find().sort({ height: -1 }).limit(250);
        if (!blocks.length) {
            return res
                .status(404)
                .json({ success: false, error: `Block not found` })
        }

        return res.status(200).json({ success: true, data: blocks, test: 'This is the correct method' })
    } catch (e) {
        console.log(err)
        return res.status(500).json({ success: false, error: err });
    }
}

getLastBlock = async (req, res) => {

    try {
        const blocks = await Block.find().sort({ height: -1 }).limit(1);
        if (!blocks.length) {
            return res
                .status(404)
                .json({ success: false, error: `Block not found` })
        }

        return res.status(200).json({ success: true, data: blocks, test: 'This is the correct method' })
    } catch (e) {
        console.log(err)
        return res.status(500).json({ success: false, error: err });
    }
}

module.exports = {
    createBlock,
    updateBlock,
    getBlocks,
    getBlockId,
    getLastBlock,
}
