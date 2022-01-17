function () {
  if (!this.response) throw new Error("This request has been piped before http.request() was called.")
  this.response.pause.apply(this.response, arguments)
}