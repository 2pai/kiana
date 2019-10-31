const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

class Server {
  constructor () {
    // eslint-disable-next-line new-cap
    this.app = new express()
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(cors())
  }

  init (port, next) {
    this.app.listen(port, () => {
      console.log(`This App Is run on ${port}`)
    })
    next()
  }
}
module.exports = Server
