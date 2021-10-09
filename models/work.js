const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workSchema = new Schema({
    
    title: String,
    description: String,
    category: String,
    // image: {
    //     data: Buffer,
    //     contentType: String
    // },
    comments: String,
    // vote: 
}, { timestamps: true });

module.exports = mongoose.model('Work', workSchema);