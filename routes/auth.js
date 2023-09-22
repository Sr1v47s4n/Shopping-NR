// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

// routes/auth.js

router.post('/register', async (req, res) => {
    try {
        const existingUser = await User.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Email or username already exists' });
        }
        
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        
        res.status(200).json({ message: 'Authentication successful' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
