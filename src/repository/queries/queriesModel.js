const { Schema, model } = require('mongoose')

const DeviceSchema = new Schema({
  deviceId: String,
  deviceName: String,
  topicDevice: String,
  dateAdded: { type: Date, default: Date.now }
})

const getListDevice = model('queries-device', DeviceSchema, 'device')
const getTopic = model('queries-getTopicdevice', DeviceSchema, 'device')

module.exports = {
  getListDevice,
  getTopic
}
