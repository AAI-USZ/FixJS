function () {
  var previous
  while (this.previous.length) {
    previous = this.previous.pop()
    morpheus(previous, {
        opacity: 0
      , duration: 300
      , complete: previous.remove
    })
  }
}