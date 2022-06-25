class Response {
    constructor(data, error = false) {
        this.data = data
        this.error = error
    }
}

module.exports = {
    Response
}