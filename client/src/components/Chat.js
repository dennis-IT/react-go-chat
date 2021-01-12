import React, { useState, useEffect } from 'react';
import { Typography, Box, Container, makeStyles, Button } from '@material-ui/core';
import queryString from 'query-string';
import io from 'socket.io-client';

import ChatIcon from '@material-ui/icons/Chat';

const ENDPOINT = 'http://localhost:5000';
let socket;

const Chat = (props) => {
    const useStyle = makeStyles(theme => ({
        root: {
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        mainContent: {
            height: '80vh',
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0.2)'
        },
        subContent1: {
            backgroundColor: 'rgba(0,0,0,0.4)',
            color: 'ivory'
        }
    }));

    const classes = useStyle();
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const { location } = props;

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        //This is to handle socket io for v3
        // let connectionOptions = {
        //     "force new connection": true,
        //     "reconnectionAttempts": "Infinity",
        //     "timeout": 10000,
        //     "transports": ["websocket"]
        // };
        // socket = io(ENDPOINT, connectionOptions); //set endpoint

        socket = io(ENDPOINT);

        //!NOTE: queryString return an object with name and room
        setName(name);
        setRoom(room);

        //Emit event from client side
        //!TODO: we can pass error object from the backend to use for error handling
        socket.emit('join', { name, room }, (error) => {
            //do something to trigger error
            if (error) {
                //alert(error);
            }
        });

        //!TODO: we can deploy code below when the component unmount
        // return () => {
        //     socket.on("disconnect", (reason) => {
        //     }); //When we leaving the chat
        //     socket.off();
        // };
    }, [location.search]);

    useEffect(() => {
        //Listen for messages sent from the server side
        socket.on('message', (message) => {
            setMessages(messages => [...messages, message]);
        });
    }, []);

    //Function for sending message
    const sendMessage = (event) => {
        event.preventDefault();
        if (message) {
            socket.emit('sendMessage', message, () => {
                setMessage('');
            });
        }
    };

    return (
        <Container maxWidth='md' className={classes.root}>
            <Box display='flex' flexDirection='column' className={classes.mainContent}>
                <Box display='flex' className={classes.subContent1} p={2}>
                    <Box display='flex' alignItems='center' flexGrow={1}>
                        <ChatIcon />&nbsp;<span style={{ fontSize: '1.5rem' }}>GoChat</span>
                    </Box>
                    <Box>
                        <Button
                            color='secondary'
                            variant='contained'
                            disableElevation
                            style={{ borderRadius: 0 }}
                        >
                            Leave
                        </Button>
                    </Box>
                </Box>

                <Box flexGrow={1} className={classes.subContent2}>

                </Box>

                <Box flexShrink={1} className={classes.subContent3}>

                </Box>

            </Box>
        </Container>
    );
};

export default Chat;
