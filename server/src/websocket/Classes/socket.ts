import { IncomingMessage } from 'http';
import WebSocket from 'ws'

class Socket {
    wss!: WebSocket.Server;
    clientMap
    ws!: WebSocket
    request!: IncomingMessage

    constructor(wss : WebSocket.Server) {
        this.wss = wss, this.clientMap = new Map(), this.ws, this.request
    }

    initialize() {
        this.wss.on('connection', (ws, request) => {
            this.ws = ws
            this.request = request

            const ip = request.socket.remoteAddress;
            ws.send(ip);
        })
    }

    broadcast() {
        this.initialize()

        this.ws.on('broadcast', data => {

            const { 
                path,
                method,
                message
            } = data

            this.wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN  && this.request.url == path) {
                client.send(message);
                }
            });
        })
    }

    speak() {
        this.initialize()

        this.ws.on('speak', data => {

            const { 
                path,
                method,
                message
            } = data

            this.wss.clients.forEach(client => {
            if (client !== this.ws && client.readyState === WebSocket.OPEN && this.request.url == path) {
                client.send(message);
            }
            });
        })
    }
}

export default Socket