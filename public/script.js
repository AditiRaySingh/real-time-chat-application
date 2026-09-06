const socket = io();

const joinPage = document.getElementById("joinPage");
const chatPage = document.getElementById("chatPage");

const nameInput = document.getElementById("nameInput");
const joinButton = document.getElementById("joinButton");

const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");

const chatMessages = document.getElementById("chatMessages");
const userCount = document.getElementById("userCount");

let myUsername = "";


// ===============================
// JOIN CHAT
// ===============================

function joinChat() {

    const name = nameInput.value.trim();

    if (name === "") {
        alert("Please enter your name");
        nameInput.focus();
        return;
    }

    myUsername = name;

    socket.emit("joinChat", name);

    joinPage.style.display = "none";
    chatPage.style.display = "flex";

    messageInput.focus();
}

joinButton.addEventListener("click", joinChat);

nameInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        joinChat();
    }

});


// ===============================
// SEND MESSAGE
// ===============================

function sendMessage() {

    const message = messageInput.value.trim();

    if (message === "") {
        return;
    }

    socket.emit("sendMessage", message);

    messageInput.value = "";

    messageInput.focus();
}

sendButton.addEventListener("click", sendMessage);

messageInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        sendMessage();
    }

});


// ===============================
// RECEIVE MESSAGE
// ===============================

socket.on("message", (data) => {

    const emptyMessage =
        document.querySelector(".empty-message");

    if (emptyMessage) {
        emptyMessage.remove();
    }

    const messageDiv = document.createElement("div");

    messageDiv.classList.add("message");

    // Check whether message belongs to me

    if (data.username === myUsername) {
        messageDiv.classList.add("my-message");
    } else {
        messageDiv.classList.add("other-message");
    }


    // Username

    const username = document.createElement("div");

    username.classList.add("message-user");

    username.textContent = data.username;


    // Message text

    const text = document.createElement("div");

    text.classList.add("message-text");

    text.textContent = data.text;


    messageDiv.appendChild(username);

    messageDiv.appendChild(text);

    chatMessages.appendChild(messageDiv);


    // Scroll down

    chatMessages.scrollTop =
        chatMessages.scrollHeight;

});


// ===============================
// SYSTEM MESSAGE
// ===============================

socket.on("systemMessage", (message) => {

    const systemDiv =
        document.createElement("div");

    systemDiv.classList.add("system-message");

    systemDiv.textContent = message;

    chatMessages.appendChild(systemDiv);

    chatMessages.scrollTop =
        chatMessages.scrollHeight;

});


// ===============================
// ONLINE USERS
// ===============================

socket.on("users", (count) => {

    userCount.textContent = count;

});