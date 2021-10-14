const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    comments: String
})

const workSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    title: String,
    description: String,
    category: {
        type: String, 
        enum: ["PAINTING", "SCULPTURE", "PRINTMAKING", "CERAMIC", "PHOTOGRAPHY", "DRAWING"]
    },
    image: {
        type: String, 
        default: '/images/default.png'},
    comments: [commentSchema]

}, { timestamps: true });

module.exports = mongoose.model('Work', workSchema);