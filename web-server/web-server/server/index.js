const net = require('net');
const fs = require('fs');

const port = 8088;

const server = net.createServer((socket) => {
    socket.on('data', (data) => {
        const filePath = 'tmp/' + data.toString();

        console.log(filePath);

        fs.readFile(filePath, (err, data) => {
            if (err) {
                socket.write('arquivo nao encontrado');
            } else {
                socket.write(data);
            }
        });
    });
});

server.listen(port, () => { console.log(`rodando porta ${port}`) });