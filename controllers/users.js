const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user.js');

router.get('/login', (req, res) => {
    res.render('login.ejs', { error: '' })
})

router.post('/login', (req, res) => {
    User.findOne({ username: req.body.username }, (err, foundUser) => {
        if(!foundUser) {
            return res.render('login.ejs', {error: 'Invalid Credentials'})
        }
        const isMatched = bcrypt.compareSync(req.body.password, foundUser.password)

        if(!isMatched) {
            return res.render('login.ejs', {error: 'Invalid Credentials'})
        }
        req.session.user = foundUser._id;
        res.redirect('/')
    })
}) 
router.get('/signup', (req, res) => {
    res.render('signup.ejs')
})

router.post('/signup', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    User.create(req.body, (err, user) => {
        req.session.user = user._id
        console.log(user)
        res.redirect('/')
    })
})

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
})
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

router.get('/yourposts', (req, res) => {
    res.render('posts.ejs')
})
module.exports = router;