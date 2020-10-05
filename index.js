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


io.on('connection', () => console.log("New Connection"));

// config 
app.use(express.static(publicFolder));










server.listen(port, () => console.log("Server Started !!"));