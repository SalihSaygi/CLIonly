"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config");
var app_1 = __importDefault(require("./app"));
var http_1 = __importDefault(require("http"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '../environment.d.ts' });
var server = http_1.default.createServer(app_1.default);
server.listen(config_1.APP_PORT, function () { return console.log("Server running in " + process.env.NODE_ENV + " environment on " + config_1.APP_PORT); });
exports.default = server;
//# sourceMappingURL=server.js.map