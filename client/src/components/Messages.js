import React from 'react';
import { makeStyles } from '@material-ui/core';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message';

const Messages = (props) => {
    const useStyle = makeStyles(theme => ({
        container: {
            overflow: 'auto',
            flex: 'auto'
        }
    }));

    const classes = useStyle();
    const { messages, name } = props;

    return (
        <ScrollToBottom className={classes.container}>
            {messages.map((message, i) => <div key={i}><Message message={message} name={name} /></div>)}
        </ScrollToBottom>
    );
};

export default Messages;
