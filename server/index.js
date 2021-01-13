const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const { addUser, removeUser, getUser, getUserInRoom } = require('./users');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//From socket.io document
//For connection
io.on('connection', (socket) => {
    socket.on('join', ({ name, room }, callback) => {
        //!TODO: we can use callback to handle error
        // const error = true;
        // if (error) {
        //     callback({ error: 'error' });
        // }

        //Start to add new user to the chat room
        const res = addUser({ id: socket.id, name, room });

        if (res.error) {
            return callback(res.error);
        }

        //if no error, join socket to a specific room
        socket.join(res.room);

        //System message when someone joins Name of emit action + Payload data
        //Emit is to emit an event from the backend to the front end
        socket.broadcast.to(res.room).emit('message', { user: 'admin', text: `** ${res.name} has joined. **` });
        socket.emit('message', { user: 'admin', text: `** Hello ${res.name}, welcome to GoChat! **` });

        io.to(res.room).emit('roomData', { room: res.room, users: getUserInRoom(res.room) });

        //Callback null
        callback();
    });

    //On is expect the event on the backend -> waiting on sendMessage 
    //socket.emit - This method is responsible for sending messages. socket.on - This method is responsible for listening for incoming messages.
    //callback is run after the event sendMessage is emitted
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        io.to(user.room).emit('message', { user: user.name, text: message }); //emit message to front end
        io.to(user.room).emit('roomData', { room: user.room, users: getUserInRoom(user.room) });
        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('message', { user: 'admin', text: `** ${user.name} has left. **` });
            io.to(user.room).emit('roomData', { room: user.room, users: getUserInRoom(user.room) });
        }
    });
});

app.use(router); //Add router as a middleware

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));