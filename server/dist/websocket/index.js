"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = __importDefault(require("ws"));
ws_1.default.Server;
var server_1 = __importDefault(require("../server"));
var redisSession_1 = __importDefault(require("../session/redisSession"));
var wss = new ws_1.default.Server({ server: server_1.default, path: "/ws" });
server_1.default.on('upgrade', function (request, socket, head) {
    console.log('Parsing session from request...');
    redisSession_1.default(request, socket, function () {
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
});
wss.on('connection', function (ws, request) {
    ws.on('auth', function (message) {
        console.log('received: %s', message);
        if (message === "superXSecret1") {
            ws.send("Authentication is successful");
        }
    });
    ws.on('broadcast', function (data) {
        wss.clients.forEach(function (client) {
            if (client.readyState === ws_1.default.OPEN) {
                client.send(data);
            }
        });
    });
    ws.on('speak', function (data) {
        wss.clients.forEach(function (client) {
            if (client !== ws && client.readyState === ws_1.default.OPEN) {
                client.send(data);
            }
        });
    });
    var ip = request.socket.remoteAddress;
    ws.send(ip);
});
//# sourceMappingURL=index.js.map