"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SESSION_OPTIONS = exports.SESSION_ABSOLUTE_TIMEOUT = exports.SESSION_IDLE_TIMEOUT = exports.SESSION_NAME = exports.SESSION_SECRET = exports.session = exports.REDIS_OPTIONS = exports.REDIS_PASSWORD = exports.REDIS_HOST = exports.REDIS_PORT = void 0;
var app_1 = require("./app");
//SET TIMES
var ONE_HOUR = 1000 * 60 * 60;
var HALF_HOUR = ONE_HOUR / 2;
var SIX_HOURS = ONE_HOUR * 6;
var ioredis = require('ioredis');
//RedisStore
exports.REDIS_PORT = (_a = process.env, _b = _a.REDIS_PORT, _b === void 0 ? 6379 : _b), exports.REDIS_HOST = (_c = _a.REDIS_HOST, _c === void 0 ? 'localhost' : _c), exports.REDIS_PASSWORD = (_d = _a.REDIS_PASSWORD, _d === void 0 ? 'secretKey1' : _d);
exports.REDIS_OPTIONS = {
    port: +exports.REDIS_PORT,
    host: exports.REDIS_HOST,
    password: exports.REDIS_PASSWORD
};
//RedisSession
exports.session = require('express-session');
exports.SESSION_SECRET = (_e = process.env, _f = _e.SESSION_SECRET, _f === void 0 ? 'reallySecretSessionPass1' : _f), exports.SESSION_NAME = (_g = _e.SESSION_NAME, _g === void 0 ? 'SID' : _g), exports.SESSION_IDLE_TIMEOUT = (_h = _e.SESSION_IDLE_TIMEOUT, _h === void 0 ? HALF_HOUR : _h);
exports.SESSION_ABSOLUTE_TIMEOUT = +(process.env.SESSION_ABSOLUTE_TIMEOUT || SIX_HOURS);
exports.SESSION_OPTIONS = {
    secret: exports.SESSION_SECRET,
    name: exports.SESSION_NAME,
    cookie: {
        maxAge: +exports.SESSION_IDLE_TIMEOUT,
        secure: app_1.IN_PROD,
        sameSite: true
    },
    rolling: true,
    resave: false,
    saveUninitialized: false
};
//# sourceMappingURL=session.js.map