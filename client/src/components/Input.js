import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

const Input = (props) => {
    const useStyle = makeStyles(theme => ({
        root: {
            display: 'flex'
        },
        inputField: {
            width: 'calc(100% - 90px)',
            height: '3.5rem',
            padding: '0.5rem',
            fontSize: '1rem',
            fontFamily: 'inherit'
        },
        buttonField: {
            borderRadius: 0,
            width: '90px',
            height: '3.5rem',
            padding: '0.5rem'
        }
    }));

    const classes = useStyle();
    const { message, setMessage, sendMessage } = props;

    return (
        <form className={classes.root}>
            <input
                className={classes.inputField}
                type='text'
                placeholder='Enter your message...'
                value={message}
                onChange={event => setMessage(event.target.value)}
                onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
            />
            <Button
                color='secondary'
                variant='contained'
                disableElevation
                onClick={event => sendMessage(event)}
                className={classes.buttonField}
            >
                <SendIcon />&nbsp;&nbsp;Send
            </Button>
        </form>
    );
};

export default Input;
