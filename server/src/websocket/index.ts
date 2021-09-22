import { response } from 'express';
import WebSocket from 'ws'
WebSocket.Server
import server from '../server'
import redisSession from '../session/redisSession'
const wss = new WebSocket.Server({ server: server, path: "/ws" });

server.on('upgrade', (request, socket, head) => {
    console.log('Parsing session from request...')

    redisSession(request, response, () => {
    if (!request.session.userId) {
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
      return;
    }

    console.log('Session is parsed!');

    wss.handleUpgrade(request, socket, head, function (ws) {
      wss.emit('connection', ws, request);
    });
  });
})

wss.on('connection', (ws, request) => {

  ws.on('auth', message => {
    console.log('received: %s', message);

    const {
        accessToken,
        refreshToken
    }

    if(message === "superXSecret1") {
        ws.send("Authentication is successful")
    }
  });
  
  ws.on('broadcast', data => {
      const { 
        path,
        message
      } = data
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN  && request.url == path) {
        client.send(data);
         }
    });
  })

  ws.on('speak', data => {
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  })
  const ip = request.socket.remoteAddress;
  ws.send(ip);
});