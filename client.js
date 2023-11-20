const net = require('net');
const readline = require('readline');

const client = new net.Socket();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

client.connect(3000, '127.0.0.1', () => {
    console.log('Connected to server');
    promptInput();
});

client.on('data', (data) => {
    console.log('Server says: ' + data);
    if (data.toString().includes('Closing connection')) {
        client.destroy();
    } else {
        promptInput();
    }
});

client.on('close', () => {
    console.log('Connection closed');
    rl.close();
});

function promptInput() {
    rl.question('Enter command (DATE, TIME, EXIT): ', (command) => {
        client.write(command);
    });
}
