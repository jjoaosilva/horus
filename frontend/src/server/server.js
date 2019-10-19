const PROTO_PATH = __dirname + '/coffefi.proto';

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const coffefi_proto = grpc.loadPackageDefinition(packageDefinition).coffefi;

const io = require('socket.io')();
const clientPB = new coffefi_proto.CoffeFi('localhost:50051',grpc.credentials.createInsecure());

io.on('connection', (client) => {

    client.on('Temperatura', (interval) => {
        console.log('client is subscribing to temperature with interval ', interval);
        setInterval(() => {
            clientPB.temperatureSensor(null, (err, response) => {
                console.log("Temperatura response: ", response)
                client.emit('Temperatura', {name: 'Temperatura',  status: response.temperature});
            });
        }, interval);
    });

    client.on('Cafeteira', (interval) => {
        console.log('client is subscribing to cafeteira with interval ', interval);
        setInterval(() => {
            clientPB.coffeMachine(null, (err, response) => {
                console.log("Cafeteira response: ", response)
                client.emit('Cafeteira', {name: 'Cafeteira',  status: response.status});
            });
        }, interval);
    });

    client.on('Lampada', (interval) => {
        console.log('client is subscribing to lampada with interval ', interval);
        setInterval(() => {
            clientPB.lamp({switch: true}, (err, response) => {
                console.log("Lamapda response: ", response)
                client.emit('Lampada', {name: 'Lampada',  status: response.power});
            });
        }, interval);
    });
  });

const port = 8000;
io.listen(port);
console.log('listening on port ', port);



