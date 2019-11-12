const App = require('./src/app')
const mqtt = require('./src/lib/connection/mqtt')
const influxDB = require('./src/lib/db/influxdb')
const mongodb = require('./src/lib/db/mongodb')
const redis = require('./src/lib/cache/redis')
require('dotenv').config()

const server = new App()

server.init(process.env.PORT || 9000, () => {
  influxDB.init()
  mongodb.init()
  redis.init()
  mqtt.init()
})
