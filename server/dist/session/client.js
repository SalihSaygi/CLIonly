"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ioredis_1 = __importDefault(require("ioredis"));
var redis_1 = require("../config/redis");
var client = new ioredis_1.default(redis_1.REDIS_OPTIONS);
client.on('error', function (error) {
    console.dir(error);
    console.error('Redis Error');
});
client.on('ready', function () {
    console.dir('Redis connection is ready');
});
client.on('end', function () {
    console.dir('Redis connection closed');
});
exports.default = client;
//# sourceMappingURL=client.js.map