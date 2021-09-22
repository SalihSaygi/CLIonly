"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAdmin = exports.ensureGuest = exports.ensureUser = void 0;
function ensureUser(args) {
    if (args.req.isAuthenticated()) {
        return args.next();
    }
    else {
        args.res.redirect('/');
    }
}
exports.ensureUser = ensureUser;
function ensureGuest(args) {
    if (!args.req.isAuthenticated()) {
        return args.next();
    }
    else {
        args.res.redirect('/dashboard');
    }
}
exports.ensureGuest = ensureGuest;
function ensureAdmin(args) {
    if (args.req.body.role == 'admin') {
        return args.next();
    }
    else {
        args.res.status(401).json({ error: 'Unauthorized Access Attempt has been blocked.' }).redirect('/401');
    }
}
exports.ensureAdmin = ensureAdmin;
//# sourceMappingURL=ensure.js.map