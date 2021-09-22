"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGO_OPTIONS = exports.MONGO_URI = void 0;
var _a = process.env, _b = _a.MONGO_USERNAME, MONGO_USERNAME = _b === void 0 ? 'admin' : _b, _c = _a.MONGO_PASSWORD, MONGO_PASSWORD = _c === void 0 ? 'secret' : _c, _d = _a.MONGO_HOST, MONGO_HOST = _d === void 0 ? 'localhost' : _d, _e = _a.MONGO_PORT, MONGO_PORT = _e === void 0 ? 27017 : _e, _f = _a.MONGO_DATABASE, MONGO_DATABASE = _f === void 0 ? 'kaster' : _f;
exports.MONGO_URI = "mongodb://\n    " + MONGO_USERNAME + ":\n    " + encodeURIComponent(MONGO_PASSWORD) + "@\n    " + MONGO_HOST + ":\n    " + MONGO_PORT + "/\n    " + MONGO_DATABASE;
exports.MONGO_OPTIONS = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
};
//# sourceMappingURL=db.js.map