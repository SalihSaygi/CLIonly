"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.REDIS_OPTIONS = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var _a = process.env, _b = _a.REDIS_PORT, REDIS_PORT = _b === void 0 ? 6379 : _b, _c = _a.REDIS_HOST, REDIS_HOST = _c === void 0 ? 'localhost' : _c, _d = _a.REDIS_PASSWORD, REDIS_PASSWORD = _d === void 0 ? 'secret' : _d;
exports.REDIS_OPTIONS = {
    port: +REDIS_PORT,
    host: REDIS_HOST,
    password: REDIS_PASSWORD,
};
//# sourceMappingURL=redis.js.map