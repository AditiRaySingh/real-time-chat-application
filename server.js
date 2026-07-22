const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 9000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

let onlineUsers = 0;

let roomNumber = 1;
let usersInCurrentRoom = 0;

io.on("connection", (socket) => {

    console.log("New user connected:", socket.id);

    onlineUsers++;

    // Create room name
    const roomName = `room-${roomNumber}`;

    // Store user information
    socket.username = `User-${socket.id.substring(0, 5)}`;
    socket.currentRoom = roomName;

    // Join room
    socket.join(roomName);

    usersInCurrentRoom++;

    console.log(
        `${socket.username} joined ${roomName}`
    );

    // Send room information to current user
    socket.emit("roomInfo", {
        room: roomName,
        username: socket.username
    });

    // Notify everyone in the room
    io.to(roomName).emit(
        "systemMessage",
        `${socket.username} joined ${roomName}`
    );

    // Send online user count to everyone
    io.emit("users", onlineUsers);

    /*
    ------------------------------------------------
    When 2 users join the current room,
    create a new room for the next users
    ------------------------------------------------
    */

    if (usersInCurrentRoom === 2) {
        roomNumber++;
        usersInCurrentRoom = 0;
    }

    /*
    ------------------------------------------------
    RECEIVE MESSAGE
    ------------------------------------------------
    */

    socket.on("client", (message) => {

        if (!message || message.trim() === "") {
            return;
        }

        const cleanMessage = message.trim();

        /*
        Send message to sender
        */

        socket.emit("reply", {
            user: "Me",
            text: cleanMessage
        });

        /*
        Send message to other users
        in the same room
        */

        socket.to(socket.currentRoom).emit("reply", {
            user: socket.username,
            text: cleanMessage
        });

    });

    /*
    ------------------------------------------------
    USER DISCONNECT
    ------------------------------------------------
    */

    socket.on("disconnect", () => {

        onlineUsers--;

        usersInCurrentRoom--;

        if (usersInCurrentRoom < 0) {
            usersInCurrentRoom = 0;
        }

        console.log(
            `${socket.username} disconnected`
        );

        /*
        Notify remaining users
        */

        socket.to(socket.currentRoom).emit(
            "systemMessage",
            `${socket.username} left the chat`
        );

        /*
        Update online users
        */

        io.emit("users", onlineUsers);
    });

});

server.listen(PORT, () => {

    console.log(
        `Server is running at http://localhost:${PORT}`
    );

});