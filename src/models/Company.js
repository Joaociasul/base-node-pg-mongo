const mongoose = require('mongoose')

const CompanySchema = new mongoose.Schema({
    corporateName: {
        type: String,
        required: true
    },
    cnpj: {
        type: String,
        required: true
    },
    fantasyName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    address: {
        number: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        district: {
            type: String,
            required: true
        },
        complement: {
            type: String,
            required: true
        },
        bla:{
            default:"bla",
            type:String
        }
    },
    settings: {
        type: Object
    },
    descricao: String
})
const CompanyModel = mongoose.model('Company', CompanySchema)

class Company {
    static createCompany = (data) => {
        return new Promise((resolve, reject) => {
            try {
                const create = CompanyModel.create(data)
                resolve(create)
            } catch (error) {
                throw reject(error)
            }
        })
    }
    static getData = (filters) => {
        return new Promise((resolve, reject) => {
            try {
                let data = CompanyModel.find(filters)
                resolve(data)
            } catch (error) {
                reject(error)
            }
        })
    }
    static filterData(filter){
        return new Promise( (resolve, reject) => {
            try {
                let data = CompanyModel.find(filter);
                resolve(data)
            } catch (error) {
                reject(error)
            }
        })
    }
    static getById(_id){
        return new Promise( (resolve, reject) => {
            try {
                let data = CompanyModel.findById(_id);
                resolve(data)
            } catch (error) {
                reject(error)
            }
        })
    }
}
module.exports = Company