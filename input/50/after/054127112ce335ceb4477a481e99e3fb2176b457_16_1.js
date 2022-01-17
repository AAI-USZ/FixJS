function () {
  if (!this._started) this.start()
  this.req.write.apply(this.req, arguments)
}