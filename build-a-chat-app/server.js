import http from 'http';
import fs from 'fs';
import { WebSocketServer } from 'ws';

const PORT = 3001;


const server = http.createServer((req, res) => {
  fs.readFile('./public/index.html', (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error loading page');
      return;
    }

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
});

const wss = new WebSocketServer({ server });

function broadcast(message) {
  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(JSON.stringify(message));
    }
  });
}

wss.on('connection', (socket, req) => {
  const username = new URL(
    req.url,
    'http://localhost'
  ).searchParams.get('username');

  broadcast({
    type: 'system',
    text: `${username} joined`
  });

  socket.on('message', (data) => {
    const { username, text } = JSON.parse(data.toString());

    broadcast({
      type: 'chat',
      username,
      text
    });
  });

  socket.on('close', () => {
    broadcast({
      type: 'system',
      text: `${username} left`
    });
  });
});

server.listen(PORT, () => {
  console.log('Chat server running at http://localhost:3001');
});
