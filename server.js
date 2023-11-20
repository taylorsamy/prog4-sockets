const net = require('net');
const moment = require('moment');

const server = net.createServer((socket) => {
    console.log('Client connected');

    socket.on('data', (data) => {
        const command = data.toString().trim();
        switch (command) {
            case 'DATE':
                socket.write(moment().format('YYYY-MM-DD') + '\n');
                break;
            case 'TIME':
                socket.write(moment().format('HH:mm:ss') + '\n');
                break;
            case 'EXIT':
                socket.end('Closing connection.\n');
                break;
            default:
                socket.write('Invalid command.\n');
        }
    });

    socket.on('end', () => {
        console.log('Client disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});
