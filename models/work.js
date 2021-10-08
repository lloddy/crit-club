const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workSchema = new Schema({
    title: String,
    description: String,
    medium: Option,
    image: img,
    comments: TBD,
    vote: TBD
}, { timestamps: true });

module.exports = mongoose.model('Work', workSchema);