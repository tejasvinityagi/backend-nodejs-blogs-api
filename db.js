const mongoose = require("mongoose");

const User =  mongoose.Schema ;
const userSchema = new User ({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:12
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        maxlength:15
    },
    bio:{
        type:String,
        required:false,
        minlength:15,
        maxlength:130
    },
    blogs:[{ type: mongoose.Types.ObjectId, ref:"Blog", required:true}]

})

module.exports = mongoose.model("User", userSchema)