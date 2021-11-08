const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = mongoose.connection;
const uniqueValidator = require('mongoose-unique-validator');

const BribedSchema = new Schema({
    queue: {
        type: Array,
        required: true,
        length: { min: 1 }
    },
    solution: {
        type: {
            bribed: Number,
            details: Array,
            tooChaotic: Boolean
        }
    }
})

BribedSchema.plugin(uniqueValidator);
module.exports = mongoose.model('ModelBribed', BribedSchema)