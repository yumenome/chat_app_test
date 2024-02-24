import './bootstrap';

const axios = require('axios');

const form = document.getElementById('form');
const inputMsg = document.getElementById('input_message');
const messageList = document.getElementById('message_list');
const sender = document.getElementById('sender');
const is_typing = document.getElementById('is_typing');
const online = document.getElementById('online');
const selectedChannel = document.getElementById('selectedChannel');
const publicChannel = document.getElementById('public');
const privateChannel = document.getElementById('private');
const precenceChannel = document.getElementById('precence');

let roomId;
let lastChannel;


form.addEventListener('submit', function (e){
    e.preventDefault();
    const userInput = inputMsg.value;

    axios.post('/send_message', { message: userInput,roomId: roomId}) //to server
    // inputMsg.value = '';
    // channel.whisper('stop_typing');
});

publicChannel.addEventListener('click', function () {

    roomId = 1;
    const channel = Echo.channel(`public.playground.${roomId}`);
    Echo.leave(lastChannel);
    lastChannel = `public.playground.${roomId}`;
    selectedChannel.innerHTML = 'on public channel';


    channel.subscribed(() => { // handshake with channel
            console.log('public channel subscribed!');
        })
        .listen('.chat_message', (event) => { //pointed on broadcast name
            console.log(event);
            const message = event.message;

            const li = document.createElement('li');

            li.textContent = message + '(public)';

            messageList.appendChild(li);
        })
})

privateChannel.addEventListener('click', function () {

    roomId = 2;
    const channel = Echo.private(`private.group.${roomId}`);
    Echo.leave(lastChannel);
    lastChannel = `private.group.${roomId}`;
    selectedChannel.innerHTML = 'on private channel';



    channel.subscribed(() => { // handshake with channel
            console.log('private channel subscribed!');
        })
        .listen('.chat_message', (event) => { //pointed on broadcast name
            console.log(event);
            const message = event.message;

            const li = document.createElement('li');

            li.textContent = message + '(private)';

            messageList.appendChild(li);
        })
})

precenceChannel.addEventListener('click', function (event) {

    roomId = 3;
    const channel = Echo.join(`presence.playground.${roomId}`); //use echo to choose channel to broadcast
    Echo.leave(lastChannel);
    lastChannel = `presence.playground.${roomId}`;
    selectedChannel.innerHTML = 'on presence channel';

    inputMsg.addEventListener('input', (event) => {

        if(inputMsg.value === '') {
            channel.whisper('stop_typing');
        }else{
            channel.whisper('start_typing',{
                name: sender.innerHTML,
            });
        }
    })

    let onlineUsers = [];

    channel.here((users) => { // here for presnce
        onlineUsers = [...users];
        console.log('Presence Channel subscribed!');
    })

    .joining((user) => {
            online.innerHTML= (user.name + " joined the room!");
            console.log( (user.name) + ' joined!');
            onlineUsers.push(user);
        })

    .leaving((user) => {
        online.innerHTML= (user.name + " left the room!");
        console.log( (user.name) + ' out!');
        onlineUsers = onlineUsers.fill(onlineUser => onlineUser.id !== user.id);
    })

    .listenForWhisper('start_typing', (user) => {
        // console.log( name );
        is_typing.innerHTML = user.name + ' is typing!';
        console.log(user.name + ' is typing!');
    })

    .listenForWhisper('stop_typing', () => {
        is_typing.innerHTML = '';
        console.log('he stopped typing!');
    }) //only in presernce

    .listen('.chat_message', (event) => { //pointed on broadcast name
        console.log(event);
        const message = event.message;

        const li = document.createElement('li');

        li.textContent = message + '(presence)';

        messageList.appendChild(li);
    })

})














