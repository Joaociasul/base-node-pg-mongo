const express = require('express');
const CompanyController = require('../controllers/CompanyController');
const {
    auth
} = require('../middlwares/auth');
const app = express();

const urlCompany = '/company'
app.post(urlCompany, auth, CompanyController.createAcion)
app.get(urlCompany + '/getById/:_id?', auth, CompanyController.index) //to filter, use req.query
app.put(urlCompany + '/:_id', auth, CompanyController.updateAction)
app.get(urlCompany + '/paginate', auth, CompanyController.paginate)


module.exports = app;