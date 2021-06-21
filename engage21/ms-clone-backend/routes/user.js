const express = require('express');
const router = express.Router();
const config = require('../config/default.json');

if(!config['jwtPrivateKey']){
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}

router.get('/', (req, res) => {
    console.log(req.query)
    const token = req.query.token
    if(!token) res.status(401).send('Access Denied. No token Provided');
    try {
        const decoded = jwt.verify(token, config['jwtPrivateKey']);
        res.send(decoded);
    } catch {
        res.status(400).send('Invalid token')
    }
})

module.exports = router;
