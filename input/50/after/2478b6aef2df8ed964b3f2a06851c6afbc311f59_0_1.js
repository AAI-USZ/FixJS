function (er) {
    if (!er) return cb()
    return cb(er.code ? "Test failed.  See above for more details." : er)
  }