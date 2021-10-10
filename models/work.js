const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workSchema = new Schema({
    // user: {
    //     type: Schema.Types.ObjectId,
    //     ref: "User"
    // },
    title: String,
    description: String,
    category: {
        type: String, 
        enum: ["PAINTING", "SCULPTURE", "PRINTMAKING", "CERAMIC", "PHOTOGRAPHY", "DRAWING"]
    },
    image: String,

}, { timestamps: true });

module.exports = mongoose.model('Work', workSchema);