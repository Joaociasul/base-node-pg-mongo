const io = require('../../index')
const Channels = {
    MESSAGE_CHAT: 'MESSAGE_CHAT'
}
class Socket {
    constructor(user_id, message, channel = Channels.MESSAGE_CHAT) {
        this.user_id = user_id
        this.message = message
        this.channel = channel
    }
    send() {
        io.emit(this.channel + '.' + this.user_id, this.message)
    }
}
module.exports = {
    Channels,
    Socket
}