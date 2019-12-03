const axios = require('axios')
const DeviceName = 'tempr1-sensor'
require('dotenv').config()
const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://localhost')
const _ = require('lodash')
console.log(`Seeder  ${DeviceName}`)
console.log(`Creating device  ${DeviceName}`)
const data = {}
axios({
  method: 'POST',
  url: 'http://localhost:3022/api/device',
  headers: {
    'Content-Type': 'application/json'
  },
  auth: {
    username: process.env.AUTH_BASIC_USERNAME,
    password: process.env.AUTH_BASIC_PASSWORD
  },
  data: {
    deviceName: DeviceName
  }
}).then((response) => {
  data.deviceId = response.data.data.deviceId
  data.topicDevice = response.data.data.topicDevice
  data.deviceName = response.data.data.deviceName
  console.log(data)
  client.subscribe(data.topicDevice, (err) => {
    console.log(err)
  })
  client.subscribe(data.topicDevice, { qos: 2 }, (err) => {
    if (err) console.log('mqtt-subscribe' + JSON.stringify(err))
    else {
      console.log('mqtt-subscribe' + 'success subscribe to ' +
    data.topicDevice)
    }
  })
})
console.log(`Send fake data to server (${data.deviceId})`)
client.on('message', (topic, msg) => {
  if (topic === data.topicDevice) {
    if (msg.toString() === '1') {
      console.log('module on')
    } else {
      console.log('module off')
    }
  }
})

setInterval(() => {
  const fakeData = JSON.stringify(
    {
      data: _.random(0, 100),
      device: data.deviceName
    })
  client.publish('sensor-data', fakeData)

  console.log('send fake data ' + fakeData)
}, (1000))
