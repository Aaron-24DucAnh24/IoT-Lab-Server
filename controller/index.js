
const MQTTController = require('./MQTTController')
const mqtt = require('mqtt')
const username = 'aaron_24'
const password = 'aio_fBdw81C4Js6BuNCFcs0QPB8qseeR'
const mqttServer = 'mqtt://io.adafruit.com'
const clientId = 'nobodyhihihihihi'
const topics = [
    'aaron_24/feeds/sensor1', 
    'aaron_24/feeds/sensor2', 
    'aaron_24/feeds/sensor3', 
    'aaron_24/feeds/frequency',
    'aaron_24/feeds/connection',
]
const buttons = [
    'aaron_24/feeds/button1', 
    'aaron_24/feeds/button2', 
    'aaron_24/feeds/button3',
]
const client = mqtt.connect(mqttServer, {
    clientId: clientId,
    username: username, 
    password: password,
})
const mqttController = new MQTTController(client)
const connectionScheduler = ()=>setInterval(mqttController.scheduleConnection, 1000)

client.on('connect', ()=>{
    console.log('=> Connect to MQTT server successfully')
    for(var topic of topics) {
         client.subscribe(topic, ()=>console.log('=> Subscribed to a topic'))
         client.publish(topic + '/get')
    }
    for(var button of buttons)
        client.subscribe(button, ()=>console.log('=> Subscribed to a topic'))
})

client.on('message', (topic, message) => 
    mqttController.navigate(topic, message)
)

connectionScheduler()

module.exports = mqttController
