const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workSchema = new Schema({
    title: String,
    description: String,
    category: Option,
    image: img,
    comments: String,
    vote: TBD
}, { timestamps: true });

module.exports = mongoose.model('Work', workSchema);