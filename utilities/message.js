// message formating 


function messageFormat(message) {

    return {
        text: message,
        createdAt: new Date().getTime()
    };
}




module.exports = { messageFormat };