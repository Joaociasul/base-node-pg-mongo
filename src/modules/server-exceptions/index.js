require('express-async-errors')
const StatusCodes = {
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
    UNPROCESSABLE_ENTITY: 422,
    BAD_REQUEST: 400,
    HTTP_OK: 200,
    HTTP_CREATED: 201
}

class ValidatorException {
    constructor(validator, message = 'Validation Error') {
        this.validator = validator
        this.message = message
        this.statusCode = StatusCodes.UNPROCESSABLE_ENTITY,
        this.error = true,
        this.data = null,
        this.status = 'unprocessable entity'
    }
}

class BadRequestException {
    constructor(message) {
        this.message = message;
        this.statusCode = StatusCodes.BAD_REQUEST;
        this.status = 'bad request error';
        this.error = true;
        this.data = null
    }
}

class NotFoundException {
    constructor(message) {
        this.message = message;
        this.statusCode = StatusCodes.NOT_FOUND;
        this.status = 'not found error';
        this.error = true;
        this.data = null;
    }
}

class ServerErrorException {
    constructor(message, error) {
        this.message = message
        this.statusCode = StatusCodes.SERVER_ERROR
        this.status = 'Server Error';
        this.exception = {
            msg: error?.message,
            stack: error?.stack
        }
        this.error = true
        this.data = null
    }
}

const exceptionsHandler = (
    error,
    req,
    res,
    next
  ) => {
    let erro = {
        datetime: new Date().toLocaleString(),
        requestbody: req.body,
        error:new ServerErrorException(error.message, error),        
    }
    // console.log(JSON.stringify(erro))
    if (
      error instanceof BadRequestException ||
      error instanceof NotFoundException ||
      error instanceof ValidatorException ||
      error instanceof ServerErrorException
    ) {
      return res.status(error.statusCode).json(error);
    }
    else if( error.constructor.name == 'ValidationError') {
        try {
            let err = error.message.split('failed:')[1].split(',')
            .map(el => {
                let splited = el.split(':')
                let key = splited[0].trim()
                let value = splited[1]
                let obj = {}
                obj[key] = value;
                return obj
            })
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(new ValidatorException(err, 'validation error'))
        } catch (e) {
            console.log(e)
        }
        return res.status(StatusCodes.SERVER_ERROR).json(new ServerErrorException(error.message, error));
    }
    return res.status(StatusCodes.SERVER_ERROR).json(new ServerErrorException(error.message, error));
  }

module.exports = {
    StatusCodes,
    ValidatorException,
    BadRequestException,
    NotFoundException,
    ServerErrorException,
    exceptionsHandler
}