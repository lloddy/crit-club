const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Work = require('../models/work')

router.get('/', (req, res) => {
    if (!req.session.user) { // user is not logged in
        return res.redirect('/login');
    }
    req.body.user = req.session.user
    Work.find({}, (err, allWorks) => {
        res.render('home.ejs', {  
        works: allWorks    
        });
    });

})

module.exports = router;