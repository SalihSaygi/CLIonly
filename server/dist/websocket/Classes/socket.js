"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Socket = /** @class */ (function () {
    function Socket() {
        this.wss, this.map = new Map();
    }
    Socket.prototype.initialize = function (wss) {
        wss.on('connection', function (ws, request) {
            var ip = request.socket.remoteAddress;
            ws.send(ip);
        });
    };
    return Socket;
}());
exports.default = Socket;
//# sourceMappingURL=socket.js.map