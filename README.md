# 💬 Real-Time Chat Application

A simple and responsive **Real-Time Chat Application** built using **HTML, CSS, JavaScript, Node.js, Express.js, and Socket.IO**.

Users can enter their name, join the chat, send messages in real time, and see the number of currently online users.

## 📸 Preview

![Real-Time Chat Application](chats.png)

## 🚀 Features

* 👤 User name registration
* 💬 Real-time messaging
* ⚡ Instant message delivery using Socket.IO
* 🟢 Online users count
* 🔵 User's messages displayed on the right
* ⚪ Other users' messages displayed on the left
* 📢 Join and leave notifications
* ⌨️ Send messages using the Enter key
* 📱 Responsive design for mobile devices
* 🔒 Basic message validation

## 🛠️ Technologies Used

* **HTML5** – Structure of the application
* **CSS3** – Styling and responsive design
* **JavaScript** – Client-side functionality
* **Node.js** – Backend runtime
* **Express.js** – Web server
* **Socket.IO** – Real-time communication

## 📂 Project Structure

```text
real-time-chat-application/
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Open the project

```bash
cd real-time-chat-application
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the server

```bash
node server.js
```

The server will start at:

```text
http://localhost:9000
```

### 5. Open the application

Open the following URL in your browser:

```text
http://localhost:9000
```

For testing real-time communication, open the application in **two browser tabs** and join with different names.

## 💡 How It Works

1. The user enters their name.
2. The client sends the name to the Node.js server using Socket.IO.
3. The server stores the username for that connection.
4. When a user sends a message, Socket.IO sends it to the server.
5. The server broadcasts the message to connected users.
6. Messages from the current user appear on the right.
7. Messages from other users appear on the left.
8. The online user count updates whenever a user joins or leaves.

## 🔄 Real-Time Communication

This project uses **Socket.IO** to establish real-time communication between the browser and server.

Main Socket.IO events used:

```text
joinChat
sendMessage
message
systemMessage
users
disconnect
```

## 🎯 Learning Outcomes

Through this project, I learned:

* How Node.js servers work
* How to create an Express.js server
* How Socket.IO enables real-time communication
* How client and server communicate using events
* How to handle multiple connected users
* How to update the DOM using JavaScript
* How to create a responsive user interface
* Basic Git and GitHub project management

## 🔮 Future Improvements

Some features that can be added in the future:

* 🔐 User authentication
* 👥 Private messaging
* 🖼️ Image and file sharing
* 😊 Emoji support
* 🕒 Message timestamps
* 🗄️ Database storage for chat history
* 🟢 Online/offline user status
* ✍️ Typing indicator

## 👨‍💻 Author

**Aditi Ray Singh**

### 📌 Project Type

**Frontend + Backend Web Development Project**

### ⭐ If you like this project

Feel free to ⭐ the repository and explore the source code.
