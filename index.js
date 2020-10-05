//packages
const path = require('path');
const http = require('http');
const express = require('express');
const socket_io = require('socket.io');
//constants
const port = process.env.PORT || 3000;
const publicFolder = path.join(__dirname, './public');

// initialize express
const app = express();
const server = http.createServer(app);
const io = socket_io(server);

let count = 0;

io.on('connection', (socket) => {
    console.log("New Connection");

    socket.emit('message', "Wellcome to chat room!!");

    socket.on('send_message', (msg) => {
        io.emit('message', msg);

    });



});

// config 
app.use(express.static(publicFolder));










server.listen(port, () => console.log("Server Started !!"));