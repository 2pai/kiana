const model = require('./queriesModel')
const logger = require('../../lib/helper/logger')
const influxDB = require('../../lib/db/influxdb')
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
const getDetailDevice = async (payload) => {
  try {
    const data = await model.getListDevice.find({
      deviceId: payload.deviceId
    }, {
      _id: 0,
      ___v: 0
    })
    logger.info('queries-getDetailDevice', JSON.stringify(data))
    return data
  } catch (error) {
    logger.error('queries-getDetailDevice', JSON.stringify(error))
    return error
  }
}
const getTopic = async (payload) => {
  try {
    const data = await model.getTopic.find({
      deviceId: payload.deviceId
    }, {
      topicDevice: 1
    })
    logger.info('queries-getTopic', JSON.stringify(data))
    return data[0].topicDevice
  } catch (error) {
    logger.error('queries-getTopic', JSON.stringify(error))
    return error
  }
}
const getDeviceName = async (payload) => {
  try {
    const data = await model.getTopic.find({
      deviceId: payload.deviceId
    }, {
      deviceName: 1
    })
    logger.info('queries-deviceName', JSON.stringify(data))
    return data[0].deviceName
  } catch (error) {
    logger.error('queries-deviceName', JSON.stringify(error))
    return error
  }
}
const getDataDevice = async (payload) => {
  try {
    const { deviceName, limit } = payload
    const query = `select data from myBelovedHome
    where deviceName='${deviceName}' 
    limit ${limit}`

    logger.info('check query', query)

    const data = await influxDB.query(query)
    logger.info('queries-getDataDevice', JSON.stringify(data))
    return data
  } catch (error) {
    logger.error('queries-getDataDevice', JSON.stringify(error))
    return error
  }
}

module.exports = {
  getListDevice,
  getDetailDevice,
  getDataDevice,
  getTopic,
  getDeviceName
}
