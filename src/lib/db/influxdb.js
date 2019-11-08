const influx = require('influx')
const logger = require('../helper/logger')
const _ = require('lodash')

const connection = new influx.InfluxDB({
  host: process.env.INFLUXDB_HOST,
  port: 8086
})

const init = () => {
  connection.getDatabaseNames()
    .then(names => {
      if (!names.includes(process.env.INFLUXDB_DATABASE)) {
        return influx.createDatabase(process.env.INFLUXDB_DATABASE)
      }
      logger.info('influx-init', names)
    })
    .then(() => {
      logger.info('influx-init', 'Influxdb connection started')
    })
    .catch((err) => {
      logger.error('influx-init', JSON.stringify(err))
    })
}

const query = async (query) => {
  try {
    const data = await connection.query(query)
    return data
  } catch (error) {
    logger.error('influx-query', error)
  }
}

const writePoints = async (measurment, tags, fields) => {
  if (_.some([measurment, tags, fields], el => _.isEmpty(el))) {
    logger.error('influx-writePoinnts', 'Payload Is Empty')
  }
  try {
    const data = await connection.writePoints([{
      measurment: measurment,
      tags: tags,
      fields: fields
    }])

    return data
  } catch (error) {
    logger.error('influx-query', error)
  }
}
module.exports = {
  init,
  query,
  writePoints
}
