const send = (res, data, message, code) => {
  res.status(code).send(
    {
      data: data,
      message: message,
      code: code
    })
}

module.exports = {
  send
}
