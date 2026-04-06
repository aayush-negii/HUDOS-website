const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Challenge = require('../models/Challenge');
const City = require('../models/City');
const Leaderboard = require('../models/Leaderboard');

// User Signup
router.post('/user/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// User Login
router.post('/user/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (!user) return res.status(401).json({ error: 'Invalid credentials' });
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Challenges
router.get('/challenges', async (req, res) => {
    try {
        const { cityId } = req.query;
        const query = cityId ? { city: cityId } : {};
        const challenges = await Challenge.find(query).populate('city');
        res.status(200).json(challenges);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Cities
router.get('/cities', async (req, res) => {
    try {
        const cities = await City.find();
        res.status(200).json(cities);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Leaderboard
router.get('/leaderboard', async (req, res) => {
    try {
        const leaderboard = await Leaderboard.find().sort({ score: -1 }).populate('user', 'name');
        res.status(200).json(leaderboard);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
