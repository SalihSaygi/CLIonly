import { APP_PORT } from './config'
import app from './app'
import http from 'http'
import dotenv from 'dotenv'
dotenv.config({ path: '../.env' })

const server = http.createServer(app)

server.listen(APP_PORT, () => console.log(`Server running in ${process.env.NODE_ENV} environment on ${APP_PORT}`))

export default server