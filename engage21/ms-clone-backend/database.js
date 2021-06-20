const config = require('./config/default.json')
const mongoose = require('mongoose')
const User = require('./Schema/user.js')

// connecting to database
mongoose.connect(`${config['connection_string']}`, {useNewUrlParser:true, useUnifiedTopology:true})
.then(() => console.log("Connected to Database"))
.catch(err => console.log(err))



// trash code just for practice and test
async function createUser() {
    const user = new User({
        name: "Chetan",
        email: "chetancousera06@gmail.com",
        password: "ChetanPandey",
    });   
    const result = await user.save();
    console.log(result)
}

async function getUser() {
    const users = await User
        .find({price: {$gte: 10, $lte: 20}}) // $ to specify that its an operator
        .or({name:"Chetan", email:"example@gmail.com"}) // returns all document that fulfills either of the condition
        .limit(10)
        .sort({name: 1})
        .select({name:1, email:1})
    // .find method returns a document query object on which
    // various queries can be applied
    console.log(users)
}

async function updateUser1(id, name, password, email) {
    const user = await User.findById(id);
    if(!user) return;

    user.name = name;
    user.email = email;
    user.password = password;

    const res = await user.save();
    console.log(res);
}

async function updateUser2(id, name, email, password) {
    const user = await User.update({_id: id}, {
        $set: {
            name: name,
            email: email,
            password: password
        }
    })
}



