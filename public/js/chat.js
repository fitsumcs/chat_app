const socket = io();
//DOM 
const messageForm = document.querySelector("#messageForm");
const messageInput = messageForm.querySelector('input');
const shareLocation = document.querySelector('#shareLocation');
const messages = document.querySelector('#messages');
const message_template = document.querySelector('#template').innerHTML;
const location_template = document.querySelector('#location_template').innerHTML;

//query string 
const { username, room_name } = Qs.parse(location.search, { ignoreQueryPrefix: true });


socket.on('message', (message) => {

    const html = Mustache.render(message_template, { message: message.text, createdAt: moment(message.createdAt).format('h:mm a') });
    messages.insertAdjacentHTML('beforeend', html);
});
socket.on('location_message', (message) => {

    const html = Mustache.render(location_template, { ref: message.url, createdAt: moment(message.createdAt).format('h:mm a') });
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
            console.log('Location Shared!!');
            shareLocation.removeAttribute('disabled');
        });

    });
});

// add user info 
socket.emit('join', { username, room_name });