"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var refresh = function (args) {
    var refreshToken = args.req.body.token;
    if (!refreshToken || !refreshTokens.includes(refreshToken)) {
        return res.json({ message: "Refresh token not found, login again" });
    }
    // If the refresh token is valid, create a new accessToken and return it.
    jsonwebtoken_1.default.verify(refreshToken, "refresh", function (err, user) {
        if (!err) {
            var accessToken = jsonwebtoken_1.default.sign({ username: user.name }, "access", {
                expiresIn: "20s"
            });
            return res.json({ success: true, accessToken: accessToken });
        }
        else {
            return res.json({
                success: false,
                message: "Invalid refresh token"
            });
        }
    });
};
exports.default = refresh;
//# sourceMappingURL=refresh.js.map