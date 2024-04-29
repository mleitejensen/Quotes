const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true,
    }
}, {timestamps: true})


const dataSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    origin: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    likes: [],
    comments: [commentSchema]
}, {timestamps: true});


const Data = mongoose.model('data', dataSchema);

module.exports = Data;