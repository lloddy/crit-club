const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workSchema = new Schema({
    title: String,
    description: String,
}, { timestamps: true });

module.exports = mongoose.model('Work', workSchema);