function (val) {
  this.setHeader('content-type', 'application/json')
  this.setHeader('accept', 'application/json')
  this._json = true
  if (typeof val === 'boolean') {
    if (typeof this.body === 'object') this.body = JSON.stringify(this.body)
  } else {
    this.body = JSON.stringify(val)
  }
  return this
}