const express = require('express');
const router = express.Router();
const config = require('../config/default.json');
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../Schema/user.js')

if(!config['jwtPrivateKey']){
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}

router.get('/', async (req, res) => {
    console.log('second-------------------------------------------------------------------------')
    console.log("token", req.headers['x-auth-token'])
    const token = req.headers['x-auth-token']
    if(!token) res.status(401).send('Access Denied. No token Provided');
    try {
        const decoded = jwt.verify(token, config['jwtPrivateKey']);
        const user = await User.find({_id:decoded._id})
        res.status(200).send(user)
    } catch {
        res.status(400).send('Invalid token')
    }
})

module.exports = router;
