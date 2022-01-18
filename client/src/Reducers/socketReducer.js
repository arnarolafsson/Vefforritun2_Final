import io from 'socket.io-client';

const socket = io('http://localhost:8080', {
    autoConnect: false
});

export default function socketReducer(state = socket, action) {
    return state;
}