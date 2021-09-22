import WebSocket from 'ws';
import { User, Room } from '../types/entities'

class RoomHandler {
    user!: User
    room!: Room
    socket: WebSocket
    roomMap

    constructor(socket: WebSocket) {
        this.user,
        this.room,
        this.socket = socket
        this.roomMap = new Map()
    }

    join() {
        this.socket.on("join", data => {
            this.socket.send(data)
        })
    }
}

export default RoomHandler