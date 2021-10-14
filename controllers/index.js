const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Work = require('../models/work');
const userName = User.username

router.get('/', (req, res) => {

    Work.find({}).populate('user').exec((err, allWorks) => {
        res.render('home.ejs', {
            works: allWorks,
        });
    });
});

module.exports = router;