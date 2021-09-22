"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var helmet_1 = __importDefault(require("helmet"));
var passport_1 = __importDefault(require("passport"));
var morgan_1 = __importDefault(require("morgan"));
var path_1 = __importDefault(require("path"));
var cors_1 = __importDefault(require("cors"));
var github_routes_1 = __importDefault(require("./routers/public/github.routes"));
var app = express_1.default();
app.use(cors_1.default({
    origin: process.env.CLIENT,
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    credentials: true,
}));
app.use(helmet_1.default());
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use('/auth', github_routes_1.default);
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static(path_1.default.join(__dirname, '/frontend/build')));
    app.get('*', function (res) {
        return res.sendFile(path_1.default.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}
else {
    app.use(morgan_1.default('dev'));
    app.get('/', function (res) {
        res.send('API is running....');
    });
}
exports.default = app;
//# sourceMappingURL=app.js.map