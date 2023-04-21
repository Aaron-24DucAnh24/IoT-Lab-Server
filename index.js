
const express   = require('express')
const http      = require('http')
const app       = express()
const server    = http.createServer(app)
const {Server}  = require('socket.io')
const io        = new Server(server)
const router    = require('./router')

const port      = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded())

io.on('connection', (socket)=> {
    console.log('=> A socket client')
})

router(app, io)

server.listen(port)
console.log('=> Server is ready')
