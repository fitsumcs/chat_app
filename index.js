//packages
const path = require('path');
const http = require('http');
const express = require('express');
const socket_io = require('socket.io');
const { messageFormat, location_messageFormat } = require('./utilities/message')
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



    //user info 
    socket.on('join', ({ username, room_name }) => {
        socket.join(room_name);
        //on specific room
        socket.emit('message', messageFormat("Welcome to chat room!!"));
        socket.broadcast.to(room_name).emit('message', messageFormat(`${username} has Joined!!`));
    });


    socket.on('send_message', (msg) => {
        io.emit('message', messageFormat(msg));

    });

    // on share location 
    socket.on('shareLocation', (location, callback) => {
        io.emit('location_message', location_messageFormat(` https://google.com/maps?q=${location.latitude},${location.longitude}`));
        callback();
    });

    socket.on('disconnect', () => {
        io.emit('message', messageFormat('A User has Left!!'));
    });

});

// config 
app.use(express.static(publicFolder));










server.listen(port, () => console.log("Server Started !!"));