const app = require('./src/app')
require('dotenv').config()
const server = app()

server.init(process.env.PORT || 9000, () => {
/* TODO :
    - init influxDB Connection
    - init MQTT Connection
    - init redis Connection
*/
})
