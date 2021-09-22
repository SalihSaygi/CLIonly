import { SessionOptions } from 'express-session'
import { IN_PROD } from './app'

//SET TIMES

 const ONE_HOUR = 1000 * 60 * 60

 const HALF_HOUR = ONE_HOUR / 2

 const SIX_HOURS = ONE_HOUR * 6

 const ioredis = require('ioredis')

//RedisStore

export const {
    REDIS_PORT = 6379,
    REDIS_HOST = 'localhost',
    REDIS_PASSWORD = 'secretKey1'
} = process.env

export const REDIS_OPTIONS = {
    port: +REDIS_PORT,
    host: REDIS_HOST,
    password: REDIS_PASSWORD
}

//RedisSession
export const session = require('express-session')

export const {
    SESSION_SECRET = 'reallySecretSessionPass1',
    SESSION_NAME = 'SID',
    SESSION_IDLE_TIMEOUT = HALF_HOUR
} = process.env

export const SESSION_ABSOLUTE_TIMEOUT = +(process.env.SESSION_ABSOLUTE_TIMEOUT || SIX_HOURS)

export const SESSION_OPTIONS: SessionOptions = {
    secret: SESSION_SECRET,
    name: SESSION_NAME,
    cookie: {
        maxAge: +SESSION_IDLE_TIMEOUT,
        secure: IN_PROD,
        sameSite: true
    },
    rolling: true,
    resave: false,
    saveUninitialized: false
}

