function _getRemoteAddress (callback) {
    var rc = req.connection
    if (req.socket && req.socket.remoteAddress) 
      callback(req.socket.remoteAddress)
    else if (rc) 
      if (rc.remoteAddress)
        callback(rc.remoteAddress)
      else if (rc.socket && rc.socket.remoteAddress) 
        callback(rc.socket.remoteAddress)
    else {
      console.log('erro: no ip')
      callback(null)
    }
  }