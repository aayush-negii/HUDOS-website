const mongoose = require('mongoose');

const ChallengeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    points: { type: Number, required: true },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Easy' },
    previewImage: { type: String },
    city: { type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true },
    isSponsored: { type: Boolean, default: false },
    sponsorDetails: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Challenge', ChallengeSchema);
