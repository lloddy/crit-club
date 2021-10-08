const express = require('express');
const router = express.Router();
const User = require('../models/user.js');




// UPDATE

// CREATE
router.get('/new', (req, res) => {
    if(!req.session.user) { // user is not logged in
        return res.redirect('/login');
    }
    User.findById(req.session.user, (err, user) => {
        res.render('new.ejs', { user });
    });
})
// EDIT
router.get('/edit', (req, res) => {
    if(!req.session.user) { // user is not logged in
        return res.redirect('/login');
    }
    User.findById(req.session.user, (err, user) => {
        res.render('edit.ejs', { user });
    });
})
// SHOW
router.get('/post', (req, res) => {
    if(!req.session.user) { // user is not logged in
        return res.redirect('/login');
    }
    User.findById(req.session.user, (err, user) => {
        res.render('show.ejs', { user });
    });
})

router.get('/yourposts', (req, res) => {
    if(!req.session.user) { // user is not logged in
        return res.redirect('/login');
    }
    User.findById(req.session.user, (err, user) => {
        res.render('posts.ejs', { user });
    });
})


module.exports = router;