function () {
  if (!this.response) this._paused = false
  else this.response.resume.apply(this.response, arguments)
}