import express from "express"
import morgan from "morgan";
import http from "http"
import cors from "cors"
import { Server as SocketServer } from "socket.io";

const app = express()
const server = http.createServer(app)
const io = new SocketServer(server, {
    cors: {
        origin: "http://localhost:5173"
    }
})



app.use(morgan('dev'))
app.use(cors())



io.on('connection', (socket) => {
    socket.on("message", (message) => {
        socket.broadcast.emit("message", {
            body : message,
            from : socket.id
        })
    })
})



server.listen(4000, () => {
    console.log("server running uvur");
})