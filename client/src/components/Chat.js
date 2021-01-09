import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import queryString from 'query-string';

const Chat = (props) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    useEffect(() => {
        const data = queryString.parse(props.location.search);

        //!NOTE: queryString return an object with name and room
        setName(data.name);
        setRoom(data.room);

    });

    return (
        <div>
            <Typography variant='h1'>Chat</Typography>
        </div>
    );
};

export default Chat;
