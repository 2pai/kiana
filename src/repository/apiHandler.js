const query = require('./queries/queries')
const command = require('./command/command')
const wrapper = require('../lib/helper/wrapper')
const logger = require('../lib/helper/logger')
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
const triggerDevice = async (req, res) => {
  const payload = {
    topic: '',
    msg: req.body.msg
  }
  payload.topic = await query.getTopic(
    {
      deviceId: req.params.deviceId
    })

  if (_.isEmpty(payload, true)) {
    wrapper.send(res, 'Payload cannot be empty', 'Error', 400)
  }
  try {
    const data = await command.triggerDevice(payload)
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
const getDetailDevice = async (req, res) => {
  const payload = {
    deviceId: req.params.deviceId
  }
  if (_.isEmpty(payload, true)) {
    wrapper.send(res, 'Payload cannot be empty', 'Error', 400)
  }

  try {
    const data = await query.getDetailDevice(payload)
    wrapper.send(res, data, 'Your Request Has Been Processed ', 202)
  } catch (error) {
    wrapper.send(res, error, 'Error', 500)
  }
}
const getDataDevice = async (req, res) => {
  const payload = {
    deviceId: req.params.deviceId,
    limit: req.body.limit || 10,
    deviceName: ''
  }
  payload.deviceName = await query.getDeviceName(payload)
  logger.info('getDataDevice', JSON.stringify(payload))
  if (_.isEmpty(payload, true)) {
    wrapper.send(res, 'Payload cannot be empty', 'Error', 400)
  }

  try {
    const data = await query.getDataDevice(payload)
    wrapper.send(res, data, 'Your Request Has Been Processed ', 202)
  } catch (error) {
    wrapper.send(res, error, 'Error', 500)
  }
}
module.exports = {
  addDevice,
  getListDevice,
  getDetailDevice,
  editDevice,
  deleteDevice,
  getDataDevice,
  triggerDevice
}
