const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 9000;

app.use(express.static(path.join(__dirname, "public")));

let onlineUsers = 0;

io.on("connection", (socket) => {

    onlineUsers++;

    io.emit("users", onlineUsers);

    // User joins
    socket.on("joinChat", (name) => {

        const username = name.trim();

        if (!username) return;

        socket.username = username;

        socket.emit("systemMessage", `Welcome, ${username}!`);

        socket.broadcast.emit(
            "systemMessage",
            `${username} joined the chat`
        );
    });

    // Message
    socket.on("sendMessage", (message) => {

        if (!socket.username) return;

        const cleanMessage = message.trim();

        if (!cleanMessage) return;

        io.emit("message", {
            username: socket.username,
            text: cleanMessage
        });
    });

    // User leaves
    socket.on("disconnect", () => {

        onlineUsers--;

        io.emit("users", onlineUsers);

        if (socket.username) {
            socket.broadcast.emit(
                "systemMessage",
                `${socket.username} left the chat`
            );
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});