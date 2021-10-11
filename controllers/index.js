const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Work = require('../models/work')

router.get('/', (req, res) => {
    Work.find({}, (err, allWorks) => {
        res.render('home.ejs', {  
        works: allWorks    
        });
    });

})

module.exports = router;