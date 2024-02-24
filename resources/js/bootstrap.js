import 'bootstrap';
import Echo from 'laravel-echo';


//build echo with pusher as queue

import Pusher from 'pusher-js';
window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: 'yumenoeme32',
    cluster: 'ap1',
    forceTLS: false,
    wsHost: window.location.hostname,
    wsPort: 6001,
    encrypted: false,
    enabledTransports: ['ws', 'wss']
});

export default Echo;
