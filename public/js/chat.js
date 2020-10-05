const socket = io();


socket.on('message', (message) => {

    console.log(message);
});

// message form 

document.querySelector("#messageForm").addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = document.querySelector('input').value;
    socket.emit('send_message', msg);
});