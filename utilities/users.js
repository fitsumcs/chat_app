const users = [];


function addUser({ id, username, room_name }) {

    // format 
    username = username.trim().toLowerCase();
    room_name = room_name.trim().toLowerCase();


    //    check empty 
    if (!username || !room_name) {
        return {
            error: "User name and Room name are required !!"
        };
    }
    // check user exist 

    const checkExist = users.find((user) => {
        return user.room_name === room_name && user.username === username;
    });

    if (checkExist) {
        return {
            error: "User name is Used !!"
        };
    }

    // add user 
    const user = {
        id,
        username,
        room_name
    };
    users.push(user);

    return user;

}

// remove user

function removeUser(id) {

    const index = users.findIndex((user) => user.id == id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }

}


// get user

function getUser(id) {
    return users.find(user => user.id === id);
}

// get users in a specific room 
function getUsers(room_name) {
    room_name = room_name.trim().toLowerCase();
    return users.filter(user => user.room_name = room_name);
}

module.exports = { addUser, removeUser, getUser, getUsers };