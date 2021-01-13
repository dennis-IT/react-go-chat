import React from 'react';
import { makeStyles, Box } from '@material-ui/core';
import ForumIcon from '@material-ui/icons/Forum';
import GroupIcon from '@material-ui/icons/Group';

const RoomInfo = (props) => {
    const useStyle = makeStyles(theme => ({
        root: {
            height: '5.5rem',
            backgroundColor: '#2c2c2c',
            padding: '1rem',
            overflow: 'auto'
        },
        text: {
            fontSize: '1.1rem',
        },
        innerText: {
            backgroundColor: '#4caf50',
            margin: '0 5px',
            padding: '0 5px',
            borderRadius: '10px'
        }
    }));

    const classes = useStyle();
    const { users, room } = props;

    return (
        <Box className={classes.root}>
            <Box display='flex' mb={1} className={classes.text}>
                <ForumIcon />&nbsp;&nbsp;Room:&nbsp;&nbsp;<span className={classes.innerText}>{room}</span>
            </Box>
            <Box display='flex' mb={1} className={classes.text}>
                <GroupIcon />&nbsp;&nbsp;Online:&nbsp;&nbsp;
                {users.map(user => (
                    <span key={user.name} className={classes.innerText}>
                        {user.name}
                    </span>
                ))}
            </Box>
        </Box>
    );
};

export default RoomInfo;
