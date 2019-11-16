const { Schema, model } = require('mongoose')

const DeviceSchema = new Schema({
  deviceId: String,
  deviceName: String,
  topicDevice: String,
  dateAdded: { type: Date, default: Date.now }
})
const addDevice = model('command-device', DeviceSchema, 'device')

module.exports = {
  addDevice
}
