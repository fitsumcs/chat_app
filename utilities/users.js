const users = [];


function addUser(id, username, room_name) {

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
    const user = users.push({
        id,
        username,
        room_name
    });

    return user;

}

// remove user

function removeUser(id) {

    const index = users.findIndex((user) => user.id == id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }

}