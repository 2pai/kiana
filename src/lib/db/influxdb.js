require('dotenv').config()
const influx = require('influx')
const logger = require('../helper/logger')
const _ = require('lodash')

const connection = new influx.InfluxDB({
  host: process.env.INFLUXDB_HOST,
  database: process.env.INFLUXDB_DATABASE,
  port: 8086,
  schema: [{
    measurement: process.env.INFLUXDB_MEASUREMENTS,
    fields: {
      data: influx.FieldType.INTEGER
    },
    tags: [
      'deviceName'
    ]
  }
  ]
})

const init = () => {
  connection.getDatabaseNames()
    .then(names => {
      if (!names.includes(process.env.INFLUXDB_DATABASE)) {
        return connection.createDatabase(process.env.INFLUXDB_DATABASE)
      }
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
    logger.error('influx-query', JSON.stringify(error))
  }
}

const writePoints = async (measurement, tags, fields) => {
  if (_.some([measurement, tags, fields], el => _.isEmpty(el))) {
    logger.error('influx-writePoinnts', 'Payload Is Empty')
  }
  logger.info('influxdb-writePoints', JSON.stringify({
    measurement,
    tags,
    fields
  }))

  try {
    const data = connection.writePoints([{
      measurement: measurement,
      tags: tags,
      fields: fields
    }])
    logger.info('influx-writePoints', JSON.stringify(data))

    return data
  } catch (error) {
    logger.error('influx-writePoinnts', JSON.stringify(error))
    return error
  }
}
module.exports = {
  init,
  query,
  writePoints
}
