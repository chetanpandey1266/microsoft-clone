const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const cors = require('cors');
const bcrypt = require('bcrypt');
const user_route = require('./routes/user.js')

// hash my password

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// routes
app.use("/user", user_route);

// connecting to database
const mongoose = require('mongoose')
const User = require('./Schema/user.js')
const config = require('./config/default.json');

mongoose.connect(`${config['connection_string']}`, {useNewUrlParser:true, useUnifiedTopology:true})
.then(() => console.log("Connected to Database"))
.catch(err => console.log(err))

// '/'

app.get('/', (req, res) => {
    console.log(" In / ");
    res.status(200).send();
})

//Login

app.post('/signin01', (req, res) => {
    const email = req.body.email;
    if(!User.find({email: email})) res.status(404).send();
    console.log(email);
    res.redirect(`/signin02?email=${email}`)
})

app.post('/signin02', async (req, res) => {
    const pswrd = req.body.password;
    const email = req.query.email;
    User.find({email:email}).
    then(async user => { 
        console.log(user)
        const isTrue = await bcrypt.compare(pswrd, user[0].password);
        if(isTrue){
            const token = user[0].generateAuthToken();
            res.header('x-auth-token', token);
            res.redirect(`/user?token=${token}`);
        }else{
            res.status(401).send('Invalid Password')
        }
       
        
    })
    .catch(err => {
        console.log(err.message);
        res.status(404).send();
    })
})

// SignUp

app.post('/signup01',  async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const user = await User.find({email:email});
    if(user.length){
        res.status(400).send(); // if email is already used
    }
    res.redirect(`/signup02?name=${name}&email=${email}`);
})

app.post('/signup02', async (req, res) => {
    console.log("first-------------------------------------------------------------------")
    const name = req.query.name;
    const email = req.query.email;
    const password = req.body.password;
    console.log("user", name, email, password);
    const user = new User({
        name: name,
        email: email,
        password: password,
    })
    const salt = await bcrypt.genSalt(10);
    const hashed_pswrd = await bcrypt.hash(password, salt);
    user.password = hashed_pswrd; // hased password

    await user.save();
    const result = await User.find({email: email})
    const token = result[0].generateAuthToken();
    res.header('x-auth-token', token);
    res.redirect(`/user?token=${token}`);
})

// Start server

const port = 5000 || process.env.PORT;

server.listen(port, () => {
    console.log(`Server active on ${port}`);
})



