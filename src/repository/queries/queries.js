const model = require('./queriesModel')
const logger = require('../../lib/helper/logger')

const getListDevice = async () => {
  try {
    const data = await model.getListDevice.find({}, {
      _id: 0,
      ___v: 0,
      topicDevice: 0,
      dateAdded: 0
    })
    logger.info('queries-getListDevice', JSON.stringify(data))
    return data
  } catch (error) {
    logger.error('queries-getListDevice', JSON.stringify(error))
    return error
  }
}

module.exports = {
  getListDevice
}
