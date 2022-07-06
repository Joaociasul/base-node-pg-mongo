(function () {
    const express = require('express');
    require('express-async-errors')
    const { NotFoundException } = require('./src/modules/server-exceptions')
    const { StatusCodes } = require('./src/modules/server-exceptions')
    const { exceptionsHandler } = require('./src/modules/server-exceptions')
    const app = express();
    require('dotenv').config()
    const http = require('http');
    const bodyParser = require('body-parser')
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))
    const mongoose = require('mongoose')
    mongoose.connect(process.env.MONGO_STRING)
    .then(() => {
        app.emit('bdOk')
    })
    .catch(e => console.log(e))
    const server = http.createServer(app);
    const io = require("socket.io")(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        }
    });
    module.exports = io
    const cors = require('cors')
    const router = require('./src/routes/router');
    app.use(router)
    app.use(exceptionsHandler)
    app.use((req, res, next) => {
        res.status(StatusCodes.NOT_FOUND).json(new NotFoundException('Not Found'))
    })
    const { authSocket } = require('./src/middlwares/auth');
    io.use(authSocket)
    app.use(cors({origin:'*',methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']}))
    app.get('/', (req, res) => {
        res.send({ping:true})
    });
    app.on('bdOk', () => {
        const port = process.env.APP_PORT || 3000
        server.listen(port, () => {
            console.log('Server on port:' + port);
        });
    })
    
})()

