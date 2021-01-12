import React from 'react';
import { makeStyles, Button } from '@material-ui/core';

const Input = (props) => {
    const useStyle = makeStyles(theme => ({
        root: {
            display: 'flex'
        },
        inputField: {

        }
    }));

    const classes = useStyle();
    const { message, setMessage, sendMessage } = props;

    return (
        <form className={classes.root}>
            <input
                className={classes.inputField}
                type='text'
                placeholder='Type your message'
                value={message}
                onChange={event => setMessage(event.target.value)}
                onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
            />
            <Button
                color='secondary'
                variant='contained'
                disableElevation
                onClick={event => sendMessage(event)}
            >
                Send
            </Button>
        </form>
    );
};

export default Input;
