import jwt from 'jsonwebtoken'
import fs from 'fs'
import { Request, Response, NextFunction } from 'express'

interface Params {
    req: Request,
    res: Response,
    next: NextFunction
}

const privateKey = fs.readFileSync('../../jwtRS256.key')
const publicKey = fs.readFileSync('../../jwtRS256.key.pub')
// check if Token exists on request Header and attach token to request as attribute
const checkTokenMW = (args: Params) => {
    const { 
        req, res, next
     } = args
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        req.token = bearerHeader.split(' ')[1];
        next();
    } else {
        res.sendStatus(403);
    }
};

// Verify Token validity and attach token data as request attribute
const verifyToken = (args: Params) => {

    const { 
        req, res
     } = args

    jwt.verify(req.token, publicKey, { algorithms: ['RS256'] }, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            return req.authData = authData;
        }
    })
};

// Issue Token
const signToken = (args: Params) => {

    const { 
        req, res
     } = args

    jwt.sign({userId: req.user.githubId}, privateKey, { algorithm: 'RS256', expiresIn:'10 min'}, (err, token) => {
        if(err){
            res.sendStatus(500);
        } else {
            res.json({token});
        }
    });
}

export { signToken, checkTokenMW, verifyToken }