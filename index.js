//packages
const path = require('path');
const express = require('express');

//constants
const port = process.env.PORT || 3000;
const publicFolder = path.join(__dirname, './public');

// initialize express
const app = express();

// config 
app.use(express.static(publicFolder));










app.listen(port, () => console.log("Server Started !!"));