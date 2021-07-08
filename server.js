const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const path = require("path");
// const { v4: uuidv4 } = require("uuid");

const cors = require("cors");
// const user_route = require("./routes/user.js");
const api = require("./routes/api.js");
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
        methods: ["POST", "GET"],
        credentials: true,
    })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

// routes
app.use("/api", api);
// app.use("/userinfo", user_route);

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

// Start server

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/microsoft-frontend/build")));
    app.get("*", (req, res, next) => {
        res.sendFile(
            path.join(__dirname, "/microsoft-frontend/build", "index.html")
        );
    });
}

const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log(`Server active on ${port}`);
});
