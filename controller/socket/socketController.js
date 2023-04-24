
var io

class socketController {

    constructor(ioInstances) {
        io = ioInstances
    }

    pumpOn(req, res) {
        io.emit("button1", "1")
        res.json("1")
    }
    
    pumpOff(req, res) {
        io.emit("button1", "0")
        res.json("1")
    }
    
    fanOn(req, res) {
        io.emit("button2", "1")
        res.json("1")
    }
    
    fanOff(req, res) {
        io.emit("button2", "0")

        res.json("1")
    }
    
    lightOn(req, res) {
        io.emit("button3", "1")
        res.json("1")
    }
    
    lightOff(req, res) {
        io.emit("button3", "0")
        res.json("1")
    }

}

module.exports = socketController
