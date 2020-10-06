//packages
const path = require('path');
const http = require('http');
const express = require('express');
const socket_io = require('socket.io');
const { messageFormat, location_messageFormat } = require('./utilities/message');
//constants
const port = process.env.PORT || 3000;
const publicFolder = path.join(__dirname, './public');
const { addUser, removeUser, getUser, getUsers } = require('./utilities/users');
// initialize express
const app = express();
const server = http.createServer(app);
const io = socket_io(server);

let count = 0;

io.on('connection', (socket) => {
    console.log("New Connection");



    //user info 
    socket.on('join', (other, callback) => {

        const { error, user } = addUser({ id: socket.id, ...other });

        if (error) {
            return callback(error);
        }
        socket.join(user.room_name);
        //on specific room
        socket.emit('message', messageFormat("Welcome to chat room!!"));
        socket.broadcast.to(user.room_name).emit('message', messageFormat(`${user.username} has Joined!!`));

        callback();



    });


    socket.on('send_message', (msg) => {

        const user = getUser(socket.id);
        io.to(user.room_name).emit('message', messageFormat(user.username, msg));

    });

    // on share location 
    socket.on('shareLocation', (location, callback) => {
        const user = getUser(socket.id);
        io.to(user.room_name).emit('location_message', location_messageFormat(user.username, ` https://google.com/maps?q=${location.latitude},${location.longitude}`));
        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        if (user) {
            io.to(user.room_name).emit('message', messageFormat(`${user.username} has Left!!`));
        }

    });

});

// config 
app.use(express.static(publicFolder));










server.listen(port, () => console.log("Server Started !!"));