const mongoose = require('mongoose');

const RewardSchema = new mongoose.Schema({
    name: { type: String, required: true },
    requiredXP: { type: Number, required: true },
    description: { type: String, required: true },
    iconUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Reward', RewardSchema);
