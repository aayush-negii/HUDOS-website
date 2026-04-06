const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    country: { type: String, required: true },
    coordinates: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('City', CitySchema);
