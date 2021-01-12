//Manage user sign in and sign out
//THis file includes all helpers functions

const users = []; //All users which are being joined is listing here

const addUser = ({ id, name, room }) => {
    //Convert the name of user and trim
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.find(user => user.room === room && user.name === name);
    if (existingUser) {
        return { error: 'Username is taken' };
    }

    const user = { id, name, room };
    users.push(user);
    return user;
};

const removeUser = (id) => {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
};

const getUser = (id) => {
    return users.find(user => user.id === id);
};

const getUserInRoom = (room) => {
    return users.filter(user => user.room === room);
};

module.exports = { addUser, removeUser, getUser, getUserInRoom };