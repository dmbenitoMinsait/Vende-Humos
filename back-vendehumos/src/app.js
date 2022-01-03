const http = require('http')
const express = require('express')
const cors = require('cors')
const appRoutes = require('./routes')
const SocketIO = require('socket.io')
const emitter = require('./utils/emitter')

const app = express()

app.use(cors({
    origin: ['http://localhost:4200'] 
}))

app.use(express.json())

app.use(appRoutes)

const server = http.createServer(app) 

const io = SocketIO(server, {
    cors: {
        origin: '*' 
    }
})

io.on('connection', (socket) => {
    console.log(`Se ha conectado alguien nuevo con el ID ${socket.id}`)
   
    emitter.on('vendehumosCreado', (noticia) => {
        socket.emit('vendehumos', noticia)
    })
})

server.listen(3200, () => {
    console.log(`Listening on http://localhost:3200`)
})