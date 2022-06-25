const Company = require("../models/Company")
const { Response } = require("../modules/response-server")
const { StatusCodes } = require("../modules/server-exceptions")

module.exports = {
    createAcion: async (req, res) => {
        const r = await Company.createCompany(req.body)
        res.status(StatusCodes.HTTP_CREATED).send(new Response(r))
    },
    index: async (req, res) => {
        if (req.params._id) {
            return await Company.getById(req.params._id)
                .then(resp => res.status(StatusCodes.HTTP_OK).send(new Response(resp)))
        }
        await Company.getData(req.query)
            .then(resp => res.status(StatusCodes.HTTP_OK).send(new Response(resp)))
    },
    updateAction: (req, res) => {
        Company.update(req.params._id, req.body)
            .then(resp => res.status(StatusCodes.HTTP_OK).send(new Response(resp)))
    },
    paginate: (req, res) => {
        Company.paginate(req)
        .then(resp => res.status(StatusCodes.HTTP_OK).send(new Response(resp)))
    }
}