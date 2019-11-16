const model = require('./queriesModel')
const logger = require('../../lib/helper/logger')

const getListDevice = async () => {
  try {
    const data = await model.getListDevice.find({})
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
