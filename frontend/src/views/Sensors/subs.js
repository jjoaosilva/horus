import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8000');

function subscribe(cb, sensor, time) {
  socket.on(sensor, response => cb(null, response));
  socket.emit(sensor, time);
}

export { subscribe };