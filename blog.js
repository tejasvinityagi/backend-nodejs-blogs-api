const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    user: {
        type: mongoose.Types.ObjectId,
        ref:"User",
        required: true
    },

    description   : {
        type: String,
        required:true,
        minlenght: 150
    }
})

module.exports = mongoose.model("Blog", blogSchema)