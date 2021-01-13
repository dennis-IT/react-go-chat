import React from 'react';
import { makeStyles, Box, Typography } from '@material-ui/core';
import clsx from 'clsx';
import ReactEmoji from 'react-emoji';

const Message = (props) => {
    const useStyle = makeStyles(theme => ({
        userText: {
            display: 'flex',
            alignItems: 'center',
            color: '#828282',
            letterSpacing: '0.3px',
            fontStyle: 'italic',
            margin: '0 0.5rem'
        },
        messageBox: {
            padding: '5px 20px',
            // borderRadius: '25px',
            maxWidth: '80%',
            display: 'inline-block'
        },
        messageText: {
            color: 'ivory',
            width: '100%',
            float: 'left',
            wordWrap: 'break-word'
        },
        blue: {
            backgroundColor: '#2196f3',
        },
        pink: {
            backgroundColor: '#f50057',
        }
    }));

    const classes = useStyle();
    const { message, name } = props;

    let isSentByCurrentUser = false;
    let isAdmin = false;
    let trimmedName = name.trim().toLowerCase(); //Compare with username sent to server

    if (message.user === trimmedName) {
        isSentByCurrentUser = true;
    } else {
        if (message.user === 'admin') {
            isAdmin = true;
        }
    }

    return (
        isSentByCurrentUser ?
            (
                <Box display='flex' justifyContent='flex-end' m={2}>
                    <Typography className={classes.userText}>
                        {trimmedName}
                    </Typography>
                    <div className={clsx({ [classes.messageBox]: true, [classes.blue]: isSentByCurrentUser, [classes.pink]: !isSentByCurrentUser })}>
                        <Typography className={classes.messageText}>
                            {ReactEmoji.emojify(message.text)}
                        </Typography>
                    </div>
                </Box>
            ) :
            (
                isAdmin ? (
                    <Box display='flex' justifyContent='center' m={2}>
                        <Typography className={classes.messageText} style={{ textAlign: 'center', fontStyle: 'italic' }}>
                            {ReactEmoji.emojify(message.text)}
                        </Typography>
                    </Box>
                ) : (
                        <Box display='flex' justifyContent='flex-start' m={2}>
                            <div className={clsx({ [classes.messageBox]: true, [classes.blue]: isSentByCurrentUser, [classes.pink]: !isSentByCurrentUser })}>
                                <Typography className={classes.messageText}>
                                    {ReactEmoji.emojify(message.text)}
                                </Typography>
                            </div >
                            <Typography className={classes.userText}>
                                {message.user}
                            </Typography>
                        </Box >
                    )
            )
    );
};

export default Message;
