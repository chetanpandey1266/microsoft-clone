const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

const bcrypt = require("bcrypt");
const config = require("../config/default.json");
const User = require("../Schema/user.js");
const jwt = require("jsonwebtoken");

if (!config["jwtPrivateKey"]) {
    console.error("FATAL ERROR: jwtPrivateKey is not defined");
    process.exit(1);
}

router.get("/user", async (req, res, next) => {
    console.log(req.params, req);
    console.log("JWTtoken :", req.headers["x-auth-token"]);
    const token = req.headers["x-auth-token"];
    if (!token) res.status(401).send("Access Denied. No token Provided");
    try {
        const decoded = jwt.verify(token, config["jwtPrivateKey"]);
        const user = await User.find({ _id: decoded._id });
        res.status(200).send(user);
    } catch {
        res.status(400).send("Invalid token");
    }
    next();
});

router.post("/signin01", (req, res) => {
    const email = req.body.email;
    if (!User.find({ email: email })) res.status(401).send("Not Registered");
    res.redirect(`/signin02?email=${email}`);
});

router.post("/signin02", async (req, res) => {
    const obj = JSON.parse(JSON.stringify(req.body));
    const pswrd = obj.password;
    const email = req.query.email;
    User.find({ email: email })
        .then(async (user) => {
            console.log(user);
            const isTrue = await bcrypt.compare(pswrd, user[0].password);
            if (isTrue) {
                const token = user[0].generateAuthToken();
                res.header("x-auth-token", token);
                res.redirect(`/user?token=${token}`);
            } else {
                res.status(401).send("Wrong Password. Try Again!");
            }
        })
        .catch((err) => {
            console.log(err.message);
            res.status(404).send("User not registered");
        });
});

// SignUp

router.post("/signup01", async (req, res) => {
    const obj = JSON.parse(JSON.stringify(req.body));
    const name = obj.name;
    const email = obj.email;
    console.log(obj);
    const user = await User.find(obj);
    console.log(user);
    if (user.length) {
        res.status(400).send("Already Registered"); // if email is already used
    }
    res.redirect(`/signup02?name=${name}&email=${email}`);
});

router.post("/signup02", async (req, res) => {
    const obj = JSON.parse(JSON.stringify(req.body));
    const name = req.query.name;
    const email = req.query.email;
    const password = obj.password;
    console.log(name, email, password);
    // console.log("user", name, email, password);
    const user = new User({
        name: name,
        email: email,
        password: password,
    });
    const salt = await bcrypt.genSalt(10);
    const hashed_pswrd = await bcrypt.hash(password, salt);
    user.password = hashed_pswrd; // hased password

    await user.save();
    const result = await User.find({ email: email });
    const token = result[0].generateAuthToken();
    res.header("x-auth-token", token);
    res.redirect(`/user?token=${token}`);
});

// profile

router.put("/profile", async (req, res) => {
    const prev_email = req.body.email;
    const next_email = req.body.userEmail;
    const name = req.body.userName;
    console.log(name, prev_email, next_email);
    const update = { email: next_email, name: name };
    User.updateOne({ email: prev_email }, update)
        .then((doc) => {
            if (!doc) return res.status(401).end();
            else res.status(200).json(doc);
        })
        .catch((err) => console.log(err));
});

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: config["email"],
        pass: config["password"],
    },
});

// email

router.post("/email", (req, res) => {
    const email = req.body.email;
    const txt = `${req.body.senderEmail} invites to you to microsoftclone meet. Join using following room ID: ${req.body.roomID}`;
    const mail = {
        from: config["email"],
        to: email,
        subject: "Invite Link for the meet",
        text: txt,
    };
    transporter.sendMail(mail, (err, data) => {
        // console.log(err, data);
        if (err) {
            console.log("error occured. Mail not sent");
            res.status(400).send(err.message);
        } else {
            console.log("Email sent!!!", data);
            res.status(200).send("Successful");
        }
    });
});

module.exports = router;
