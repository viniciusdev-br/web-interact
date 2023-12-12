import { io } from 'socket.io-client';

const URL = 'http://dev.digitro.com';

export const socket = io(URL, {
    autoConnect: true,
    path: '/callcontrol',
});