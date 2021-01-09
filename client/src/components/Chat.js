import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import queryString from 'query-string';
import io from 'socket.io-client';

let socket;

const Chat = (props) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const ENDPOINT = 'http://localhost:5000';
    const { location } = props;

    useEffect(() => {
        const data = queryString.parse(location.search);

        //Handle socket io
        let connectionOptions = {
            "force new connection": true,
            "reconnectionAttempts": "Infinity",
            "timeout": 10000,
            "transports": ["websocket"]
        };

        socket = io(ENDPOINT, connectionOptions); //set endpoint

        //!NOTE: queryString return an object with name and room
        setName(data.name);
        setRoom(data.room);

        //Emit event from client side
        //!TODO: we can pass error object from the backend to use for error handling
        // socket.emit('join', { name, room }, ({ error }) => {
        //     alert(error);
        // });

        socket.emit('join', { name, room }, () => {

        });

        //!TODO: deploy component un mount
        return () => {
            socket.emit('disconnect'); //When we leaving the chat

            socket.off();
        };

    }, [ENDPOINT, location.search, name, room]);

    return (
        <div>
            <Typography variant='h1'>Chat</Typography>
        </div>
    );
};

export default Chat;
