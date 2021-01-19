import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Container, makeStyles, Button } from '@material-ui/core';
import queryString from 'query-string';
import io from 'socket.io-client';

import ChatIcon from '@material-ui/icons/Chat';
import Input from './Input';
import Messages from './Messages';
import RoomInfo from './RoomInfo';

const ENDPOINT = 'https://react-go-chat.herokuapp.com/';
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
            [theme.breakpoints.down('sm')]: {
                height: '95vh'
            },
            [theme.breakpoints.up('sm')]: {
                height: '80vh'
            },
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0.2)'
        },
        subContent1: {
            backgroundColor: 'rgba(0,0,0,0.4)',
            color: 'ivory',
            height: '4.25rem'
        },
        subContent2: {
            height: 'calc(100% - 7.75rem - 5.5rem)'
        },
        subContent3: {
            height: '3.5rem'
        }
    }));

    const classes = useStyle();
    const history = useHistory();
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState([]);
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

        socket.on("roomData", ({ users }) => {
            setUsers(users);
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
                        <ChatIcon />&nbsp;&nbsp;<span style={{ fontSize: '1.5rem' }}>GoChat</span>
                    </Box>
                    <Box>
                        <Button
                            color='secondary'
                            variant='contained'
                            disableElevation
                            style={{ borderRadius: 0 }}
                            onClick={() => { history.push('/'); socket.close(); }}
                        >
                            Leave
                        </Button>
                    </Box>
                </Box>

                <Box>
                    <RoomInfo users={users} room={room} />
                </Box>

                <Box display='flex' className={classes.subContent2}>
                    <Messages messages={messages} name={name} />
                </Box>

                <Box className={classes.subContent3}>
                    <Input
                        message={message}
                        setMessage={setMessage}
                        sendMessage={sendMessage}
                    />
                </Box>

            </Box>
        </Container>
    );
};

export default Chat;
