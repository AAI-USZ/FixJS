function (chunk) {
  if (chunk) this.write(chunk)
  if (!this._started) this.start()
  this.req.end()
}