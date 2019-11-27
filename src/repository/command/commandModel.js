const { Schema, model } = require('mongoose')

const DeviceSchema = new Schema({
  deviceId: String,
  deviceName: String,
  topicDevice: String,
  dateAdded: { type: Date, default: Date.now }
})

const addDevice = model('command-addDevice', DeviceSchema, 'device')
const updateDevice = model('command-updateDevice', DeviceSchema, 'device')
const deleteDevice = model('command-deleteDevice', DeviceSchema, 'device')

module.exports = {
  addDevice,
  updateDevice,
  deleteDevice
}
