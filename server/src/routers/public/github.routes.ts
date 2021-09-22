import express from 'express';
const passportRouter = express.Router();
import { v4 as uuidv4 } from 'uuid'
import passport from 'passport';
import { checkTokenMW, signToken, verifyToken } from '../../service/jwt'
import { CLIENT } from '../../config'

const map = new Map();

passportRouter.get(
  '/github',
  passport.authenticate('github', { session: false, scope: ['user'] })
);

passportRouter.get(
  '/github/callback', (req, res) => {
    passport.authenticate('github', {
    session: false,
    failureRedirect: '/auth/login/failed',
    successRedirect: `${process.env.ORIGIN_URL}/profile`,
    })
    signToken(req, res);
    const socketId = uuidv4()
    req.session.socketId = socketId
    res.send({ result: 'OK', message: 'Socket updated' });
    }

);

passportRouter.get('/login/success', checkTokenMW, (req, res) => {
  if (req.user) {
    console.log(req.user);
    res.status(200).json(req.user);
  }
});

passportRouter.get('/login/failed', (req, res) => {
  res.status(401);
});

passportRouter.get('/logout', function (req, res) {
  req.logout();
  const ws = map.get(req.session.socketId);

  console.log('Destroying session');
  req.session.destroy(function () {
    if (ws) ws.close();

    res.send({ result: 'OK', message: 'Socket destroyed' });
  });
  res.redirect(CLIENT);
});

export default passportRouter;