require('dotenv').config()
const redis = require('redis')
const logger = require('../helper/logger')
const _ = require('lodash')

const client = redis.createClient({
  url: process.env.REDIS_HOST,
  port: 6379
})
const init = () => {
  client.on('connect', () => {
    logger.info('redis-init', 'Redis Client connected')
  })

  client.on('error', (err) => {
    logger.error('redis-init', JSON.stringify(err))
  })
}

const set = (key, val) => {
  if (_.some([key, val], el => _.isEmpty(el))) {
    logger.error('redis-set', 'Payload Cannot be empty')
    return 1
  }

  client.set(key, val, (err, res) => {
    if (err) logger.error('redis-set', JSON.stringify(err))
    logger.info('redis-set', res)
  })

  return 0
}

const get = (key) => {
  if (_.isEmpty(key)) {
    logger.error('redis-get', 'Payload Cannot be empty')
    return 1
  }

  client.get(key, (err, res) => {
    if (err) logger.error('redis-get', JSON.stringify(err))
    logger.info('redis-get', res)
    return res
  })
}

module.exports = {
  init,
  set,
  get
}
