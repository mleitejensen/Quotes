const mongoose = require('mongoose');

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
    likes: []
}, {timestamps: true});


const Data = mongoose.model('data', dataSchema);

module.exports = Data;