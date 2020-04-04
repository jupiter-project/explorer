const Generator = require('../models/generators-model')
const request = require('request')

recordGenerator = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a generator.',
        })
    }

    const generator = new Generator(body)

    if (!body) {
        return res.status(400).json({ success: false, error: err })
    }

    generator
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: generator._id,
                generator: generator.generators,
                message: 'Generator info stored!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Error saving generator info!',
            })
        })
}

getGenerators = async (req, res) => {

    try {
        const generators = await Generator.find();
        if (!generators.length) {
            return res
                .status(404)
                .json({ success: false, error: `Generators not found` })
        }

        return res.status(200).json({ success: true, data: generators, test: 'This is the correct method' })
    } catch (e) {
        console.log(err)
        return res.status(500).json({ success: false, error: err });
    }
}

getGenerator = async (req, res) => {
    await Generator.findOne({ generators: req.params.id }, (err, generator) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!generator) {
            return res
                .status(404)
                .json({ success: false, error: `Generator not found!` })
        }
        return res.status(200).json({ success: true, data: generator })
    }).catch(err => console.log(err))
}

module.exports = {
    recordGenerator,
    getGenerators,
    getGenerator,
}
