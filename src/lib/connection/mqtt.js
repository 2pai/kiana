require('dotenv').config()
const mqtt = require('mqtt')
const logger = require('../helper/logger')
const _ = require('lodash')
const client = mqtt.connect(process.env.MQTT_URL)
const { getListDevice } = require('../../repository/queries/queriesModel')
const { writePoints } = require('../db/influxdb')
const init = () => {
  client.on('connect', () => {
    subscribe('sensor-data')
    getListDevice.find({}, { topicDevice: 1, _id: 0 }, async (err, doc) => {
      if (err) logger.error('mqtt-init', JSON.stringify(err))
      doc.map(async (val) => {
        logger.info('mqtt-init', 'Subscribe to : ' + val.topicDevice)
        await subscribe(val.topicDevice)
      })
    })

    logger.info('mqtt-init', 'MQTT connected')
  })
}

const publish = async (topic, msg) => {
  client.publish(topic, msg.toString(), { qos: 2 }, (err) => {
    if (err) logger.error('mqtt-publish', JSON.stringify(err))
    else logger.info('mqtt-publish', 'message published to ' + topic)
  })
}

const subscribe = async (topic) => {
  client.subscribe(topic, { qos: 2 }, (err) => {
    if (err) logger.error('mqtt-subscribe', JSON.stringify(err))
    else logger.info('mqtt-subscribe', 'success subscribe to ' + topic)
  })
}

const unsubscribe = async (topic) => {
  client.unsubscribe(topic, { qos: 2 }, (err) => {
    if (err) logger.error('mqtt-unsubscribe', JSON.stringify(err))
    else logger.info('mqtt-unsubscribe', 'success unsubscribe to ' + topic)
  })
}

client.on('message', async (topic, message) => {
  if (_.isEqual(topic, 'sensor-data')) {
    const msg = JSON.parse(message.toString())
    writePoints(process.env.INFLUXDB_MEASUREMENTS, {
      deviceName: msg.device
    }, { data: msg.data })
    logger.info('mqtt-message', message.toString())
  }
})

module.exports = {
  init,
  publish,
  subscribe,
  unsubscribe
}
