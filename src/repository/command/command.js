const model = require('./commandModel')
const uuid = require('uuid/v4')
const logger = require('../../lib/helper/logger')
const { subscribe } = require('../../lib/connection/mqtt')

const addDevice = async (payload) => {
  try {
    const topic = payload.deviceName.trim().slice(0, 3) +
    '-' + uuid().slice(0, 7)

    await subscribe(topic)
    const data = await model.addDevice({
      deviceId: uuid(),
      deviceName: payload.deviceName,
      topicDevice: topic
    }).save()
    logger.info('command-addDevice', JSON.stringify(data))
    return data
  } catch (error) {
    logger.error('command-addDevice', JSON.stringify(error))
    return error
  }
}

const editDevice = async (payload) => {
  try {
    const topic = payload.deviceName.trim().slice(0, 3) +
    '-' + uuid().slice(0, 7)

    await subscribe(topic)
    const data = await model.updateDevice.findOneAndUpdate(
      {
        deviceId: payload.deviceId
      },
      {
        topicDevice: topic,
        deviceName: payload.deviceName
      }, { new: true })

    logger.info('command-editDevice', JSON.stringify(data))
    return data
  } catch (error) {
    logger.error('command-editDevice', JSON.stringify(error))
    return error
  }
}

const deleteDevice = async (payload) => {
  try {
    const data = await model.deleteDevice.deleteOne({
      deviceId: payload.deviceId
    })
    logger.info('command-deleteDevice', JSON.stringify(data))
    return data
  } catch (error) {
    logger.error('command-deleteDevice', JSON.stringify(error))
    return error
  }
}

module.exports = {
  addDevice,
  editDevice,
  deleteDevice
}
