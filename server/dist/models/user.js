"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    githubId: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    hasBots: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Bot',
        },
    ],
}, {
    timestamps: true,
});
exports.User = mongoose_1.model('User', UserSchema);
//# sourceMappingURL=user.js.map