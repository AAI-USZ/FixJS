function (chunk) {
  if (chunk) this.write(chunk)
  if (!this._started) this.start()
  if (!this.req) throw new Error("This request has been piped before http.request() was called.")
  this.req.end()
}