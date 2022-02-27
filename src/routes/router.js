const express = require('express');
const CompanyController = require('../controllers/CompanyController');
const {
    setToken,
    auth
} = require('../middlwares/auth');
const app = express();
app.get('/teste', auth, (req, res) => {
    res.status(200).send(req.user)
})
app.get('/set', (req, res) => {
    res.send({
        token: setToken(5)
    })
})

const urlCompany = '/company'
app.post(urlCompany, auth, CompanyController.createAcion)
app.get(urlCompany + '/:_id?', auth, CompanyController.index)
module.exports = app;