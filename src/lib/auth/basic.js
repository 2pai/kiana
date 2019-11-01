const _ = require('lodash')
const passport = require('passport')
const { BasicStrategy } = require('passport-http')

class User {
  constructor (uname, pass) {
    this.username = uname
    this.password = pass
  }
}

passport.use(new BasicStrategy((username, password, cb) => {
  if (_.isEqual(username, process.env.AUTH_BASIC_USERNAME) && _.isEqual(password, process.env.AUTH_BASIC_PASSWORD)) {
    return cb(null, new User(username, password))
  } else {
    return cb(null, false)
  }
}))

const init = () => passport.initialize()
const isAuth = passport.authenticate('basic', { session: false })

module.exports = {
  init,
  isAuth
}
