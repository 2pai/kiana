const App = require('./src/app')
const mqtt = require('./src/lib/connection/mqtt')
require('dotenv').config()

const server = new App()

server.init(process.env.PORT || 9000, () => {
/* TODO :
    - init influxDB Connection
    - init redis Connection
*/
  mqtt.init()
})
