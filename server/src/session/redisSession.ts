import { SESSION_OPTIONS } from '../config/session';
import session from 'express-session'
import store from './store'

const redisSession = session({
        ...SESSION_OPTIONS, store
})

export default redisSession