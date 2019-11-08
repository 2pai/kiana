const mqtt = require('mqtt')
const logger = require('../helper/logger')
const _ = require('lodash')
const client = mqtt.connect(process.env.MQTT_URL)

const init = () => {
  client.on('connect', () => {
    /* fetch list topic -> subscribe to topic */
    subscribe('sensor-data')
    logger.info('mqtt-init', 'MQTT connected')
  })
}

const publish = (topic, msg) => {
  client.publish(topic, msg.toString(), { qos: 2 }, (err) => {
    if (err) logger.error('mqtt-publish', err)
  })
}

const subscribe = (topic) => {
  client.subscribe(topic, { qos: 2 }, (err) => {
    if (err) logger.error('mqtt-subscribe', err)
  })
}

client.on('message', (topic, message) => {
  if (_.isEqual(topic, 'sensor-data')) /* insert data to db here */ logger.info('mqtt-message', message.toString())
})

module.exports = {
  init,
  publish,
  subscribe
}
