const express = require('express')

require('express-async-errors')
const { NotFoundException } = require('./src/modules/server-exceptions')
const { StatusCodes } = require('./src/modules/server-exceptions')
const { exceptionsHandler } = require('./src/modules/server-exceptions')
const router = require('./src/routes/router')
require('dotenv').config()
const cors = require('cors')

const app = express()
app.use(cors({origin:'*',methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']}))
app.use(express.json())
app.use(router)
app.use(exceptionsHandler)
app.use((req, res, next) => {
    res.status(StatusCodes.NOT_FOUND).json(new NotFoundException('Not Found'))
})
const mongoose = require('mongoose')
    mongoose.connect(process.env.MONGO_STRING)
    .then(() => {
        app.emit('bdOk')
    })
    .catch(e => console.log(e))
app.on('bdOk', () => {
    const port = process.env.APP_PORT | 3000
    const server = app.listen(port, () => {
        console.log("Integração view node listen on port: " + port)
    })
    const io = require("socket.io")(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        }
    });
    module.exports = io
    const { authSocket } = require('./src/middlwares/auth');
    io.use(authSocket)
})