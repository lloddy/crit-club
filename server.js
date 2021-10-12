// =======================================
//              DEPENDENCIES
// =======================================
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const indexController = require('./controllers/index');
const usersController = require('./controllers/users');
const authorizedController = require('./controllers/authorized')
const expressSession = require('express-session');
const methodOverride = require('method-override')
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;
// =======================================
//              DATABASE
// =======================================
mongoose.connect(DATABASE_URL)
const db = mongoose.connection
db.on('connected', () => {
    console.log(`You're connected to MongoDB`)
});
db.on('error', (error) => {
    console.log(`Uh oh...an error occured with MongoDB ${error.message} o.0`)
});
// =======================================
//              MIDDLEWARE
// =======================================
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"))
app.use(express.static("public"))
app.use(expressSession({
    secret: '2348#(*$#lajslkdfj',
    resave: false,
    saveUninitialized: false
}))

// =======================================
//              ROUTES
// =======================================
app.use('/', indexController);
app.use('/', usersController);
app.use('/', authorizedController)
// =======================================
//              LISTENER
// =======================================
app.listen(PORT, () => {
    console.log(`Express is listening on port:${PORT}`)
});