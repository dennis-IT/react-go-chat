const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//From socket.io document
//For connection
io.on('connetion', (socket) => {
    console.log('We have a new connection');

    socket.on('disconnect', () => {
        console.log('User has left');
    });
});

app.use(router); //Add router as a middleware

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));