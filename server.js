const App = require('./src/app')
const mqtt = require('./src/lib/connection/mqtt')
const influxDB = require('./src/lib/db/influxdb')
require('dotenv').config()

const server = new App()

server.init(process.env.PORT || 9000, () => {
  influxDB.init() // bug
  /* TODO :
    - init redis Connection
  */
  mqtt.init()
})
