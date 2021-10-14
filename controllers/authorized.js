const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Work = require('../models/work')
const mongoose = require('mongoose')
const isAuthorized = (req, res, next) => {
    if (!req.session.user) { // user is not logged in
        return res.redirect('/login');
    } 
    next()
}

router.get('/posts', isAuthorized, (req, res) => {
    Work.find({user: req.session.user}, (err, works) => {
        res.render('posts.ejs', {works, currentUser: req.session.user})
        })
    })
    // User.findOne(req.body.user, (err, user) => {
    //     Work.find({}, (err, allWorks) => {
    //         res.render('posts.ejs', {
    //             works: allWorks
    //         });
    //     });
    // });
// })
//  Work.find({}, (err, works) => {
//         res.render('posts', { works, user: req.session.user})
//     })
// })
router.get('/new', isAuthorized, (req, res) => {

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
router.post('/posts', isAuthorized, (req, res) => {
    req.body.user = req.session.user
    Work.create(req.body, (error, createdWork) => {
        res.redirect("posts")
    })
})

router.post('/works/:id/comments', (req, res) => {
        req.body.user = req.session.user
        Work.findById(req.params.id, (error, work) => {
        work.comments.push(req.body)
        work.save()
        res.redirect(`/works/${req.params.id}`)
    })
})

// EDIT
router.get('/works/:id/edit', isAuthorized, (req, res) => {
    req.body.user = req.session.user
    Work.findById(req.params.id, (err, foundWork) => {
        res.render('edit.ejs', {
            work: foundWork,
        });
    })
});
// SHOW
router.get('/works/:id', isAuthorized, async(req, res) => {
    const foundWork = await Work.findById(req.params.id).populate('user comments.user')
        const userId = await foundWork.user._id.valueOf()
        res.render('show.ejs', {
            user: req.session.user,
            work: foundWork,
            userId: userId
        })
    })





module.exports = router;