
const SocketController = require('../controller/socket/socketController')
const MQTTController = require('../controller/mqtt/index')


function router(app, io) {

    const socketController = new SocketController(io)
    MQTTController.setIo(io)

    app.get('/auto', MQTTController.setAutoMode)
    app.get('/pumpOn',socketController.pumpOn)
    app.get('/pumpOff',socketController.pumpOff)
    app.get('/fanOn',socketController.fanOn)
    app.get('/fanOff',socketController.fanOff)
    app.get('/lightOn',socketController.lightOn)
    app.get('/lightOff',socketController.lightOff)
    app.get('/bounds', MQTTController.getBounds)
    app.get('/:bounds', MQTTController.setBounds)
}

module.exports = router
