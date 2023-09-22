const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const User = require('./models/User'); // Import your User model
const authRoutes = require('./routes/auth'); // Import your authentication routes

const app = express();
const port = 3001;

mongoose.connect('mongodb://localhost:27017/myapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('MongoDB connection error:', error);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files (HTML, CSS, etc.)
app.use(express.static('public'));

// Registration and login routes
app.use('/auth', authRoutes);

// Home page route accessible only to authenticated users
app.get('/home', authenticate, (req, res) => {
    res.json({ message: 'Welcome to the home page!' });
});

// Your authentication middleware (authenticate) and other code here

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
