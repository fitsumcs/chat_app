const socket = io();
//DOM 
const messageForm = document.querySelector("#messageForm");
const messageInput = messageForm.querySelector('input');
const shareLocation = document.querySelector('#shareLocation');
const messages = document.querySelector('#messages');
const message_template = document.querySelector('#template').innerHTML;
const location_template = document.querySelector('#location_template').innerHTML;
socket.on('message', (message) => {

    const html = Mustache.render(message_template, { message: message.text, createdAt: message.createdAt });
    messages.insertAdjacentHTML('beforeend', html);
});
socket.on('location_message', (ref) => {

    const html = Mustache.render(location_template, { ref });
    messages.insertAdjacentHTML('beforeend', html);

});

// message form 

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = document.querySelector('#mesg').value;
    socket.emit('send_message', msg);
    messageInput.value = '';
    messageInput.focus();
});

// share location 
shareLocation.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }
    shareLocation.setAttribute('disabled', 'disabled');
    navigator.geolocation.getCurrentPosition((position) => {

        socket.emit('shareLocation', {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
        }, () => {
            //console.log('Location Shared!!');
            const html = Mustache.render(message_template, { message: "Location Shared!!" });
            messages.insertAdjacentHTML('beforeend', html);
            shareLocation.removeAttribute('disabled');
        });

    });

});