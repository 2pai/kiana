const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const basicAuth = require('../lib/auth/basic')
const logger = require('../lib/helper/logger')
const apiHandler = require('../repository/apiHandler')
class Server {
  constructor () {
    this.app = express()
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(cors())
    this.app.use(basicAuth.init())

    // endpoint
    this.app.get('/', basicAuth.isAuth, (req, res) => {
      res.send('This service is running properly ')
    })
    this.app.get(
      '/api/getListDevice',
      basicAuth.isAuth,
      apiHandler.getListDevice) // get list device
    this.app.get(
      '/api/device/:deviceId',
      basicAuth.isAuth,
      apiHandler.getDetailDevice) // get detail device
    this.app.get(
      '/api/device/:deviceId/data',
      basicAuth.isAuth,
      apiHandler.getDataDevice) // get detail device
    this.app.post('/api/device',
      basicAuth.isAuth,
      apiHandler.addDevice) // add device
    this.app.put('/api/device/:deviceId',
      basicAuth.isAuth,
      apiHandler.editDevice) // edit/update device
    this.app.delete('/api/device/:deviceId',
      basicAuth.isAuth,
      apiHandler.deleteDevice) // delete device
    this.app.post('/api/device/:deviceId',
      basicAuth.isAuth,
      apiHandler.triggerDevice) // trigger device
  }

  init (port, next) {
    this.app.listen(port, () => {
      logger.info('app-init', `app run on ${port} `, '')
    })
    next()
  }
}
module.exports = Server
