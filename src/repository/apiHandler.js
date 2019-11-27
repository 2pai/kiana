const query = require('./queries/queries')
const command = require('./command/command')
const wrapper = require('../lib/helper/wrapper')
const _ = require('lodash')
const addDevice = async (req, res) => {
  const payload = {
    deviceName: req.body.deviceName
  }
  if (_.isEmpty(payload, true)) {
    wrapper.send(res, 'Payload cannot be empty', 'Error', 400)
  }
  try {
    const data = await command.addDevice(payload)
    wrapper.send(res, data, 'Your Request Has Been Processed ', 201)
  } catch (error) {
    wrapper.send(res, error, 'Error', 500)
  }
}
const editDevice = async (req, res) => {
  const payload = {
    deviceName: req.body.deviceName,
    deviceId: req.params.deviceId
  }
  if (_.isEmpty(payload, true)) {
    wrapper.send(res, 'Payload cannot be empty', 'Error', 400)
  }
  try {
    const data = await command.editDevice(payload)
    wrapper.send(res, data, 'Your Request Has Been Processed ', 201)
  } catch (error) {
    wrapper.send(res, error, 'Error', 500)
  }
}
const deleteDevice = async (req, res) => {
  const payload = {
    deviceId: req.params.deviceId
  }
  if (_.isEmpty(payload, true)) {
    wrapper.send(res, 'Payload cannot be empty', 'Error', 400)
  }
  try {
    const data = await command.deleteDevice(payload)
    wrapper.send(res, data, 'Your Request Has Been Processed ', 201)
  } catch (error) {
    wrapper.send(res, error, 'Error', 500)
  }
}
const getListDevice = async (req, res) => {
  try {
    const data = await query.getListDevice()
    wrapper.send(res, data, 'Your Request Has Been Processed ', 202)
  } catch (error) {
    wrapper.send(res, error, 'Error', 500)
  }
}

module.exports = {
  addDevice,
  getListDevice,
  editDevice,
  deleteDevice
}
