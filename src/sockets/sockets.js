const io = require('../../index_old')
module.exports = {
    sendMessageToClient :(channel, message) => {
        io.emit(channel, message);
    }
} 
