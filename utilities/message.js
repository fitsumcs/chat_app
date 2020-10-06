// message formatting 


function messageFormat(message) {

    return {
        text: message,
        createdAt: new Date().getTime()
    };
}

function location_messageFormat(url) {

    return {
        url,
        createdAt: new Date().getTime()
    };
}



module.exports = { messageFormat, location_messageFormat };