const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength: 3
    },
    email: {
        type:String,  
        required:true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
})

// User  class
module.exports = mongoose.model('userInfo', userSchema);
