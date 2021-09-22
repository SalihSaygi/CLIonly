"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var passportRouter = express_1.default.Router();
var uuid_1 = require("uuid");
var passport_1 = __importDefault(require("passport"));
var config_1 = require("../../config");
var map = new Map();
passportRouter.get('/github', function (req, res) {
    passport_1.default.authenticate('github', { scope: ['user'] });
    var socketId = uuid_1.v4();
    req.session.socketId = socketId;
    res.send({ result: 'OK', message: 'Socket updated' });
});
passportRouter.get('/github/callback', passport_1.default.authenticate('github', {
    failureRedirect: '/auth/login/failed',
    successRedirect: process.env.ORIGIN_URL + "/profile",
}));
passportRouter.get('/login/success', function (req, res) {
    if (req.user) {
        console.log(req.user);
        res.status(200).json(req.user);
    }
});
passportRouter.get('/login/failed', function (req, res) {
    res.status(401);
});
passportRouter.get('/logout', function (req, res) {
    req.logout();
    var ws = map.get(req.session.socketId);
    console.log('Destroying session');
    req.session.destroy(function () {
        if (ws)
            ws.close();
        res.send({ result: 'OK', message: 'Socket destroyed' });
    });
    res.redirect(config_1.CLIENT);
});
exports.default = passportRouter;
//# sourceMappingURL=github.routes.js.map