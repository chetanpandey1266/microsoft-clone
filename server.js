const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const path = require("path");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const cors = require("cors");
const bcrypt = require("bcrypt");
const user_route = require("./routes/user.js");
const {
    addUsers,
    removeUsers,
    getUsers,
    getUsersInRoom,
} = require("./helper/chat");

const socket = require("socket.io");
const io = socket(server, {
    cors: {
        origin: ["http://localhost:3000", "http://localhost:3000/*"],
        methods: ["POST", "GET"],
        credentials: true,
    },
    path: "/user",
});
// hash my password

app.use(
    cors({
        origin: ["http://localhost:3000", "http://localhost:3000/*"],
        credentials: true,
    })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.use("/user", user_route);

// connecting to database
const mongoose = require("mongoose");
const User = require("./Schema/user.js");
const config = require("./config/default.json");
const { text } = require("express");

mongoose
    .connect(process.env.MONGODB_URI || `${config["connection_string"]}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => console.log("Connected to Database"))
    .catch((err) => console.log(err));

// Socket connection

const users = {};

const socketToRoom = {};

io.on("connection", (socket) => {
    // events for chat

    socket.on("joinRoom", ({ name, room }, callback) => {
        const { error, user } = addUsers({ id: socket.id, name, room });

        if (error) return callback(error);

        socket.emit("message", {
            user: "admin",
            msg: `${user.name}, Welcome to the room ${user.room}`,
        });
        socket.broadcast.to(user.room).emit("message", {
            user: "admin",
            msg: `${user.name} has joined the room ${user.room}`,
        });

        socket.join(user.room);
        callback();
    });

    socket.on("sendMsg", (message, callback) => {
        const user = getUsers(socket.id);

        io.to(user.room).emit("message", { user: user.name, msg: message });

        callback();
    });

    // events for call
    console.log("Socket Connection established with socket ID:");
    console.log(socket.id);

    socket.emit("me", socket.id);

    socket.on("disconnect", () => {
        socket.broadcast.emit("callEnded");
    });

    socket.on("callUser", (data) => {
        // console.log("userToCall ", data);
        io.to(data.usedToCall).emit("callUser", {
            signal: data.signalData,
            from: data.from,
            name: data.name,
        });
    });

    socket.on("answerCall", (data) => {
        console.log("to ", data.to);
        io.to(data.to).emit("callAccepted", data.signal);
    });

    // events for team

    socket.on("join room", (roomID) => {
        if (users[roomID]) {
            const length = users[roomID].length;
            if (length === 4) {
                socket.emit("room full");
                return;
            }
            users[roomID].push(socket.id);
        } else {
            users[roomID] = [socket.id];
        }
        socketToRoom[socket.id] = roomID;
        const usersInThisRoom = users[roomID].filter((id) => id !== socket.id);

        socket.emit("all users", usersInThisRoom);
    });

    socket.on("sending signal", (payload) => {
        io.to(payload.userToSignal).emit("user joined", {
            signal: payload.signal,
            callerID: payload.callerID,
        });
    });

    socket.on("returning signal", (payload) => {
        io.to(payload.callerID).emit("receiving returned signal", {
            signal: payload.signal,
            id: socket.id,
        });
    });

    socket.on("disconnect", () => {
        const user = removeUsers(socket.id);
        if (user) {
            io.to(user.room).emit("message", {
                user: "admin",
                msg: `${user.name} has left`,
            });
        }

        const roomID = socketToRoom[socket.id];
        let room = users[roomID];
        if (room) {
            room = room.filter((id) => id !== socket.id);
            users[roomID] = room;
        }
        socket.broadcast.emit("user left", socket.id);
    });
});

// '/'

// app.get("/", (req, res) => {
//     console.log(" In / ");
//     res.status(200).send();
// });

//Login

app.post("/signin01", (req, res) => {
    const email = req.body.email;
    console.log(email);
    res.redirect(`/signin02?email=${email}`);
});

app.post("/signin02", async (req, res) => {
    const pswrd = req.body.password;
    const email = req.query.email;
    User.find({ email: email })
        .then(async (user) => {
            // console.log(user)
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

app.post("/signup01", async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const user = await User.find({ email: email });
    if (user.length) {
        res.status(400).send("Already Registered"); // if email is already used
    }
    res.redirect(`/signup02?name=${name}&email=${email}`);
});

app.post("/signup02", async (req, res) => {
    const name = req.query.name;
    const email = req.query.email;
    const password = req.body.password;
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

app.put("/profile", async (req, res) => {
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

app.post("/email", (req, res) => {
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

// Start server

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/microsoft-frontend/build")));
    app.get("*", (req, res) => {
        res.sendFile(
            path.join(__dirname, "/microsoft-frontend/build", "index.html")
        );
    });
}

server.listen(port, () => {
    console.log(`Server active on ${port}`);
});
