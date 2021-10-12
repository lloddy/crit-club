const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Work = require('../models/work')

router.get('/posts', (req, res) => {
    if (!req.session.user) { // user is not logged in
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

router.get('/new', (req, res) => {
    if (!req.session.user) { // user is not logged in
        return res.redirect('/login');
    }
    User.findById(req.session.user, (err, user) => {
        res.render('new.ejs', {
            user
        });
    });
})

// Delete
router.delete('/works/:id', (req, res) => {
    // if (!req.session.user) { // user is not logged in
    //     return res.redirect('/login');
    // }
    // req.body.user = req.session.user
    Work.findByIdAndDelete(req.params.id, (err, data) => {
        res.redirect('/posts')
    });

})
// UPDATE
router.put('/works/:id', (req, res) => {
    Work.findByIdAndUpdate(
        req.params.id,
        req.body, {
            new: true
        },
        (error, updatedWork) => {
            res.redirect('/posts')
        }
    )
})
// CREATE
router.post('/posts', (req, res) => {
    if (!req.session.user) { // user is not logged in
        return res.redirect('/login');
    }
    req.body.user = req.session.user
    Work.create(req.body, (error, createdWork) => {
        res.redirect("posts")
    })
})
// EDIT
router.get('/works/:id/edit', (req, res) => {
    if (!req.session.user) { // user is not logged in
        return res.redirect('/login');
    }
    req.body.user = req.session.user
    Work.findById(req.params.id, (err, foundWork) => {
        res.render('edit.ejs', {
            work: foundWork,
        });
    })
});
// SHOW
router.get('/works/:id', (req, res) => {
    Work.findById(req.params.id).populate('user').exec((err, foundWork) => {
        res.render('show.ejs', {
            work: foundWork,
        })
    })
})





module.exports = router;