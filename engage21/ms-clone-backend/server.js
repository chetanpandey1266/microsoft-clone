const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const cors = require('cors');

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(express.urlencoded({extended:false}));
app.use(express.json());

// connecting to database
const mongoose = require('mongoose')
const User = require('./Schema/user.js')
const config = require('./config/default.json')

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
    console.log(email)
    res.redirect(`/signin02?email=${email}`)
})

app.post('/signin02', (req, res) => {
    const pswrd = req.body.password;
    const email = req.query.email;
    console.log(email);
    res.status(200).send()
})

// SignUp

app.post('/signup01', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    console.log(name, user);
    debugger;
    res.redirect(`/signup02?name=${name}&email=${email}`)
})

app.post('/signup02', (req, res) => {
    const name = req.query.name;
    const email = req.query.email;
    const password = req.body.password;
    console.log(name, email, password);
    // const user = new User({
    //     name: name,
    //     email: email,
    //     password: password
    // })

    // user.save()
    //     .then(() => console.log("Saved Data"))
    //     .catch(err => console.log(err.message))
    res.status(200).send()
})

// Start server

const port = 5000 || process.env.PORT;

server.listen(port, () => {
    console.log(`Server active on ${port}`);
})



