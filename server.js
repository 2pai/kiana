const App = require('./src/app')
require('dotenv').config()
const Server = new App()

Server.init(process.env.PORT, () => {
/* TODO :
    - init influxDB Connection
    - init MQTT Connection
    - init redis Connection
*/
})
