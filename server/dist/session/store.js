"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var connect_redis_1 = __importDefault(require("connect-redis"));
var client_1 = __importDefault(require("./client"));
var express_session_1 = __importDefault(require("express-session"));
var RedisStore = connect_redis_1.default(express_session_1.default);
var store = new RedisStore({ client: client_1.default });
exports.default = store;
//# sourceMappingURL=store.js.map