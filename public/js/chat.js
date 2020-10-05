const socket = io();


socket.on('countUpdated', (count) => {

    console.log("Count Updated : " + count);
});

// button 

document.querySelector("#inc").addEventListener('click', () => {
    console.log('clicked!');
    socket.emit('increment');
});