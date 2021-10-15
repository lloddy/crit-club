const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Work = require('../models/work');
const cloudinary = require('cloudinary');
const isAuthorized = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next()
};

router.get('/posts', isAuthorized, (req, res) => {
    Work.find({
        user: req.session.user
    }, (err, works) => {
        res.render('posts.ejs', {
            works,
            currentUser: req.session.user
        });
    });
});

router.get('/new', isAuthorized, (req, res) => {

    User.findById(req.session.user, (err, user) => {
        res.render('new.ejs', {
            user
        });
    });
});

// Delete
router.delete('/works/:id', (req, res) => {
    Work.findByIdAndDelete(req.params.id, (err, data) => {
        res.redirect('/posts')
    });
});
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
});
// CREATE
router.post('/posts', isAuthorized, (req, res) => {
    req.body.user = req.session.user
    const photo = req.files.image;
    photo.mv(`./uploads/${photo.name}`);
    cloudinary.uploader.upload(`./uploads/${photo.name}`).then(result => {
        req.body.image = result.secure_url;
        Work.create(req.body, (error, createdWork) => {
            res.redirect('/posts')
        });
    });
});

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
    });
});
// SHOW
router.get('/works/:id', isAuthorized, async (req, res) => {
    const foundWork = await Work.findById(req.params.id).populate('user comments.user')
    const userId = await foundWork.user._id.valueOf()
    res.render('show.ejs', {
        user: req.session.user,
        work: foundWork,
        userId: userId
    });
});

module.exports = router;