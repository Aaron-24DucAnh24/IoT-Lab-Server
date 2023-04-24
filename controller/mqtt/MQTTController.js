
var frequency  = 15
var uart_frequency = 10
var connection_count = 0
var thresholds = [40, 35, 70]
var autoMode   = false
var connection = true
var connectionText = ''
var client = null
var io = null

const buttons = [
    'aaron_24/feeds/button1', 
    'aaron_24/feeds/button2', 
    'aaron_24/feeds/button3',
]

class MQTTController {

    constructor(cl) {
        client = cl
    }

    navigate(topic, message) {
        console.log(`=> Received ${topic}: ${message.toString()}`)

        if(topic.includes('frequency'))
            this.handleFrequency(topic, message)
        else if(topic.includes('connection'))
            this.handleConnection(message.toString())
        else if(topic.includes('button'))
            this.handleButton(topic, message)
        else if(autoMode && connection) 
            this.autoControl(topic, message)
    }

    autoControl(topic, message) {
        var value = parseFloat(message)
        var index = parseInt(topic[topic.length-1])-1
        if(index == 1){
            if(value > thresholds[1])
                io.emit('button2','1')
            else 
                io.emit('button2', '0')
        }
        else {
            if(value < thresholds[index])
                io.emit(`button${index+1}`, '1')
            else
                io.emit(`button${index+1}`, '0')

        }
    }

    setAutoMode (req, res){
        if(autoMode){
            autoMode = false
            for(var button of buttons)
                client.publish(button, "0")
        } else autoMode = true
        console.log("=> Auto mode: " + `${autoMode}`)
        res.json(autoMode)
    }

    setBounds(req, res) {
        var values = req.params.bounds.split('o')
        for(var i = 0; i < values.length; i+=1)
            thresholds[i] = parseInt(values[i])
        res.json("ok")
    }

    getBounds(req, res){
        var result = `${thresholds[0]},${thresholds[1]},${thresholds[2]}`
        res.json(result)
    }

    handleConnection(message) {
        connection = message=='OKAY'?true:false
        autoMode = message=='OKAY'?autoMode:false
        connectionText = message
        connection_count = message!='No connection to gateway'?0:connection_count
        if(message != 'OKAY' && connection) this.setButtons('0')
    }

    scheduleConnection() {
        connection_count += 1
        if(connection_count == 15) {
            connection_count = 0
            if(connectionText != 'No connection to gateway')
                client.publish('aaron_24/feeds/connection', 'No connection to gateway')
        }
    }

    setButtons(param) {
        for(var button of buttons)
            client.publish(button, param)
    }

    handleButton(topic, message) {
        if(message.toString() == '1' && !connection)
            client.publish(topic, '0')
    }

    handleFrequency(topic, message) {
        var value = parseInt(message) 
        if(!connection && value!=frequency && value!=uart_frequency)
            client.publish(topic, `${topic.includes('uart')?uart_frequency:frequency}`)
        else {
            if(topic.includes("uart")) uart_frequency = value
            else frequency = value
        }
    }

    setIo(ioInstances) {
        io = ioInstances
    }
}

module.exports =  MQTTController
