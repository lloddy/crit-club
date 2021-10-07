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
router.get('/edit', (req, res) => {
    res.render('edit.ejs')
})
// UPDATE

// CREATE
router.get('/new', (req, res) => {
    res.render('new.ejs')
})
// EDIT

// SHOW
router.get('/post', (req, res) => {
    res.render('show.ejs')
})
module.exports = router;