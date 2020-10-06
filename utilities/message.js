// message formatting 


function messageFormat(username, message) {

    return {
        username,
        text: message,
        createdAt: new Date().getTime()
    };
}

function location_messageFormat(username, url) {

    return {
        username,
        url,
        createdAt: new Date().getTime()
    };
}



module.exports = { messageFormat, location_messageFormat };