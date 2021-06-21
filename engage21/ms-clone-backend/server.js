const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const cors = require('cors');
const user_route = require('./routes/user.js')

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
const user = require('./Schema/user.js');

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

app.post('/signin02', (req, res) => {
    const pswrd = req.body.password;
    const email = req.query.email;
    User.find({email:email, password: pswrd}).
    then(user => { 
        console.log(user);
        res.redirect(`/user`);
        res.end(JSON.stringify(user))
    })
    .catch(err => {
        console.log(err.message);
        res.status(404).send();
    })
})

// SignUp

app.post('/signup01', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    res.redirect(`/signup02?name=${name}&email=${email}`)
})

app.post('/signup02', (req, res) => {
    const name = req.query.name;
    const email = req.query.email;
    const password = req.body.password;
    console.log(name, email, password);
    const user = new User({
        name: name,
        email: email,
        password: password
    })

    user.save()
        .then(() => console.log("Saved Data"))
        .catch(err => console.log(err.message))
    res.status(200).send()
})

// Start server

const port = 5000 || process.env.PORT;

server.listen(port, () => {
    console.log(`Server active on ${port}`);
})



