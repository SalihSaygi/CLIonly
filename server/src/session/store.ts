import connectRedis from 'connect-redis'
import client from './client'
import session from 'express-session'

const RedisStore = connectRedis(session);
const store = new RedisStore({ client });

export default store