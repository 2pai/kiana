require('dotenv').config()
const mongoose = require('mongoose')
const logger = require('../helper/logger')

const init = () => {
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    reconnectTries: 30,
    keepAlive: true,
    reconnectInterval: 500, // Reconnect every 500ms
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000 // Close sockets after 45 seconds of inactivity
  }, (err) => {
    if (err) logger.info('mongodb-init', JSON.stringify(err))
  })
  logger.info('mongodb-init', 'MongoDB Is Connected')
}

module.exports = {
  init
}
