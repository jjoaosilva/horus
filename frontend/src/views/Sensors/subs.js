import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:5010');
console.log(socket)
function subscribe(cb, sensor, time) {
  socket.on('connect', (response)=> console.log('response', response));
  // socket.on(sensor, response => console.log(sensor, response));
  socket.emit('/teste', '/INFO');
}
subscribe()
export { subscribe };