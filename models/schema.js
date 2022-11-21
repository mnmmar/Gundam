const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gSchema = new Schema({
    name: String,
    price: Number,
    images: [String],
    shipping: Number,
    estimatedArrival: String
});

const Gundam = mongoose.model('Gundam', gSchema);
module.exports = Gundam;