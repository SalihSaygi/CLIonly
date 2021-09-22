"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var session_1 = require("../config/session");
var express_session_1 = __importDefault(require("express-session"));
var store_1 = __importDefault(require("./store"));
var redisSession = express_session_1.default(__assign(__assign({}, session_1.SESSION_OPTIONS), { store: store_1.default }));
exports.default = redisSession;
//# sourceMappingURL=redisSession.js.map