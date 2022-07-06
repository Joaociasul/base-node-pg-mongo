const express = require('express');
const CompanyController = require('../controllers/CompanyController');
const {
    auth, setToken
} = require('../middlwares/auth');
const { Response } = require('../modules/response-server');
const { StatusCodes } = require('../modules/server-exceptions');
const { Channels } = require('../sockets');
const { Socket } = require('../sockets');
const app = express();

app.get('/teste', auth, (req, res) => {
    res.status(200).send(req.user)
})
app.get('/set', (req, res) => {
    res.send({
        token: setToken(5)
    })
})

app.post('/socket-test', (req, res) => {
    (new Socket(1, req.body, Channels.MESSAGE_CHAT)).send()
    res.sendStatus(200)
})

const urlCompany = '/company'
app.get(urlCompany, async (req, res) => {
    return res.status(StatusCodes.HTTP_OK)
        .json(new Response(
            await new Promise((resolve, reject) => {
                throw new Error('erro')
            })
        ))
})
app.post(urlCompany, auth, CompanyController.createAcion)
app.get(urlCompany + '/getById/:_id?', auth, CompanyController.index) //to filter, use req.query
app.put(urlCompany + '/:_id', auth, CompanyController.updateAction)
app.get(urlCompany + '/paginate', auth, CompanyController.paginate)

module.exports = app;