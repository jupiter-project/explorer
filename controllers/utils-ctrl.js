const Utils = require('../models/utils-model')

getMaxSupply = async (req, res, err) => {

    try {
        const maxSupply = await Utils.find()
        if (!maxSupply.length) {
            return res
                .status(404)
                .json({ success: false, error: `You dun fucked up A-Aron` })
        }

        return res.status(200).json(maxSupply[0].maxSupply)
    } catch (e) {
        console.log(err)
        return res.status(500).json({ success: false, error: `You dun fucked up A-Aron` });
    }
}

getIndexPrice = async (req, res, err) => {

    try {
        const indexPrice = await Utils.find()
        i = indexPrice.length - 1
        if (!indexPrice.length) {
            return res
                .status(404)
                .json({ success: false, error: `You dun fucked up A-Aron` })
        }

        return res.status(200).json(indexPrice[i].indexPrice)
    } catch (e) {
        console.log(err)
        return res.status(500).json({ success: false, error: `You dun fucked up A-Aron` });
    }
}

getCirculatingSupply = async (req, res, err) => {

    try {
        const circulatingSupply0 = await Utils.find().sort({ circulatingSupply: -1 })
        if (!circulatingSupply0.length) {
            return res
                .status(404)
                .json({ success: false, error: `You dun fucked up A-Aron` })
        }

        return res.status(200).json(circulatingSupply0[0].circulatingSupply)
    } catch (e) {
        console.log(err)
        return res.status(500).json({ success: false, error: err });
    }
}

getSupply = async (req, res) => {

    try {
        const supply = await Utils.find()
        if (!supply.length) {
            return res
                .status(404)
                .json({ success: false, error: `You dun fucked up A-Aron` })
        }

        return res.status(200).json({ success: true, data: supply, test: 'This is the correct method' })
    } catch (e) {
        console.log(err)
        return res.status(500).json({ success: false, error: err });
    }
}

saveMaxSupply = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an amount',
        })
    }

    const maxSupply = new Utils(body)

    if (!maxSupply) {
        return res.status(400).json({ success: false, error: err })
    }

    maxSupply
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: maxSupply._id,
                maxSupply: maxSupply.totalAmountNQT,
                message: 'Max supply info stored!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Error saving dat maximum dawg!',
            })
        })
}

module.exports = {
    getMaxSupply,
    getCirculatingSupply,
    saveMaxSupply,
    getSupply,
    getIndexPrice,
}
