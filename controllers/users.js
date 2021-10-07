const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user.js');

// INDEX
router.get('/', (req, res) => {
    res.render('home.ejs')
})
// NEW

// DElETE

// UPDATE

// CREATE

// EDIT

// SHOW

module.exports = router;