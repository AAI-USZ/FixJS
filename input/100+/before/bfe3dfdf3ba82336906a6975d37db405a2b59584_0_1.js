function () {
    if (!data) return callback(false)

    if (!isGitHub(req.connection.remoteAddress)) {
      return callback(false)
    } 

    var value = data.split('payload=')[1]

    if (!value) {
      return callback(false)
    }

    try {
      var payload = JSON.parse(unescape(value) || null)
    } catch(err) {
      return callback(false)
    }

    if (!payload) {
      return callback(false)
    }

    return callback(true)
  }