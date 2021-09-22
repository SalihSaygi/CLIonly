import { Request,  Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken'

interface Params {
    req: Request,
    res: Response,
    next: NextFunction
}

const refresh = (args: Params) => {
    const refreshToken = args.req.body.token;
    if (!refreshToken || !refreshTokens.includes(refreshToken)) {
        return res.json({ message: "Refresh token not found, login again" });
    }

    // If the refresh token is valid, create a new accessToken and return it.
    jwt.verify(refreshToken, "refresh", (err, user) => {
        if (!err) {
            const accessToken = jwt.sign({ username: user.name }, "access", {
                expiresIn: "20s"
            });
            return res.json({ success: true, accessToken });
        } else {
            return res.json({
                success: false,
                message: "Invalid refresh token"
            });
        }
    });
};

export default refresh