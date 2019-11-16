const model = require('./commandModel')
const _ = require('lodash')
const uuid = require('uuid/v4')
const logger = require('../../lib/helper/logger')
const { subscribe } = require('../../lib/connection/mqtt')

const addDevice = async (payload) => {
  try {
    const topic = payload.deviceName.trim().slice(0, 3) + '-' + _.random(255)
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

module.exports = {
  addDevice
}
