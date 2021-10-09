const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Work = require('../models/work')


router.get('/new', (req, res) => {
    if(!req.session.user) { // user is not logged in
        return res.redirect('/login');
    }
    User.findById(req.session.user, (err, user) => {
        res.render('new.ejs', { user });
    });
})
router.get('/new', (req, res) => {
    if(!req.session.user) { // user is not logged in
        return res.redirect('/login');
    }
    User.findById(req.session.user, (err, user) => {
        res.render('new.ejs', { user });
    });
})

router.get('/posts', (req, res) => {
    if(!req.session.user) { // user is not logged in
        return res.redirect('/login');
    }
    User.findById(req.session.user, (err, user) => {
        Work.find({}, (err, allWorks) => {
            res.render('posts.ejs', { 
            works: allWorks    
            });
        });
    });
})
// UPDATE

// CREATE
router.post('/posts', (req, res) => {
    if(!req.session.user) { // user is not logged in
        return res.redirect('/login');
    }
    User.findById(req.session.user, (err, user) => {
        res.render('new.ejs', { user });
    });
    Work.create(req.body, (error, createdWork) => {
        res.redirect("/posts")
    })
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




module.exports = router;