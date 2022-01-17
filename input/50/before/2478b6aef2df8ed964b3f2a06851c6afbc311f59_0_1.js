function (er) {
    if (!er) return cb()
    return cb("Test failed.  See above for more details.")
  }