const express = require('express');
const router = express.Router();
const ModelBrided = require('../models/bribed');
const { param, body, validationResult } = require('express-validator')
const mongoose = require('mongoose');
const db = mongoose.connection;
const calculate = require('../controller/bribed')

router.get('/', async (req, res) => {
    try {
        const b = await ModelBrided.find({}).select('-__v -solution.details');
        res.json({ success: true, data: b })
    } catch (err) {
        res.status.json({
            success: false,
            message: err.message
        })
    }
})

router.get('/:id',
    body('id').notEmpty().withMessage('"id" most not be empty'),
    async (req, res) => {
        const id = req.params.id
        try {
            const b = await ModelBrided.findById(id);
            if (!b) {
                res.status(404).json({
                    success: false,
                    message: `The entry "id: ${id}" not found'`
                })
            }
            res.json({ success: true, data: b })
        } catch (err) {
            res.status.json({
                success: false,
                message: err.message
            })
        }
    }
)

router.post('/',
    body('queue').isArray({ min: 1 }).withMessage('"queue" most be a not empty array')
        .custom(queue => {
            const b = Array.isArray(queue) && queue.every(v => typeof v === 'number' && v > 0);
            if (!b) {
                throw new Error('All elements on "queue" most be positive integer');
            }
            return true;
        })
        .custom(queue => {
            const len = queue.length;
            const m = {};
            queue.forEach(v => {
                if (typeof v === 'number' && v > 0 && v <= len) {
                    if (m[v]) throw new Error('All elements on "queue" most be diferents');
                    m[v] = true;
                }
            })
            if (Object.keys(m).length !== len || m[0]) {
                throw new Error('Elements on "queue" must be values from 1 to n, arbitrarily ordered');
            }
            return true;
        }),
    async (req, res) => {
        const result = validationResult(req)
        const hasError = !result.isEmpty();
        if (hasError) {
            res.status(400).send({ success: false, ...result })
        }
        const { queue } = req.body;
        try {
            const solution = calculate([...queue]);
            modelB = new ModelBrided({
                queue: [...queue],
                solution
            })
            await modelB.save();
            res.status(201).json({ success: true, data: modelB })
        } catch (err) {
            res.status(400).json({
                success: false,
                message: err.message
            })
        }
    }
)

router.delete('/:id',
    async (req, res) => {
        try {
            const id = req.params.id
            const b = await ModelBrided.findByIdAndDelete(id);
            console.log(b);
            if (!b) {
                res.status(404).json({
                    success: false,
                    message: `The entry "id: ${id}" not found'`
                })
            }
            res.status(240);
        }
        catch (err) {
            res.status(400).json({
                success: false,
                message: err.message
            })
        }
    }
)

router.put('/:id',
    body('id').notEmpty().withMessage('"id" most not be empty'),
    body('queue').isArray({ min: 1 }).withMessage('"queue" most be a not empty array')
        .custom(queue => {
            const b = Array.isArray(queue) && queue.every(v => typeof v === 'number' && v > 0);
            if (!b) {
                throw new Error('All elements on "queue" most be positive integer');
            }
            return true;
        })
        .custom(queue => {
            const len = queue.length;
            const m = {};
            queue.forEach(v => {
                if (typeof v === 'number' && v > 0 && v <= len) {
                    if (m[v]) throw new Error('All elements on "queue" most be diferents');
                    m[v] = true;
                }
            })
            if (Object.keys(m).length !== len || m[0]) {
                throw new Error('Elements on "queue" must be values from 1 to n, arbitrarily ordered');
            }
            return true;
        }),
    async (req, res) => {
        const result = validationResult(req)
        const hasError = !result.isEmpty();
        if (hasError) {
            res.status(400).send({ success: false, ...result })
        }
        const id = req.params.id;
        const { _id, queue } = req.body;
        if (_id !== id)
            res.status(400).json({
                success: false,
                message: 'Invalid "id", does not match with param id'
            })
        try {
            const solution = calculate([...queue]);
            const b = await ModelBrided.findByIdAndUpdate(id, {
                queue: [...queue],
                solution
            })
            if (!b) {
                res.status(404).json({
                    success: false,
                    message: `"id: ${id}" not found'`
                })
            }
            console.log(b)
            res.status(201).json({
                success: true,
                data: {
                    _id: id,
                    queue: [...queue],
                    solution
                }
            })
        } catch (err) {
            res.status(400).json({
                success: false,
                message: err.message
            })
        }
    }
)

module.exports = router;