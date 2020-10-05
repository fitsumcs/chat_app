const socket = io();


socket.on('message', (message) => {

    console.log(message);
});

// message form 

document.querySelector("#messageForm").addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = document.querySelector('#mesg').value;
    socket.emit('send_message', msg);
});

// share location 
document.querySelector('#shareLocation').addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    navigator.geolocation.getCurrentPosition((position) => {

        socket.emit('shareLocation', {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
        });

    });

});