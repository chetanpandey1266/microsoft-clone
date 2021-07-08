const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('../config/default.json')

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

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, config['jwtPrivateKey'])
    return token;
}
    
// User  class
module.exports = mongoose.model('userInfo', userSchema);
