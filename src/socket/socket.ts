import {io} from 'socket.io-client';
import {token} from "../util/Constants";


const URL = 'http://localhost:3001';

export const socket = io(URL, {
    extraHeaders: {
        Authorization: `${token}`
    },
    autoConnect: true
});