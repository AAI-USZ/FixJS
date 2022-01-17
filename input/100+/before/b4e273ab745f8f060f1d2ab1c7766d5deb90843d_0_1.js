function _getRemoteAddress (callback) {
    var rc = req.connection
      , ra = 'remoteAddress'
    if (req.socket && req.socket[ra]) {
      callback(null, req.socket[ra])
    }
    else if (rc && rc[ra]) {
      callback(null, rc[ra])
    }
    else if (rc && rc.socket && rc.socket[ra]) {
      callback(null, rc.socket[ra])
    }
    else {
      callback(null, '0.0.0.0')
    }
  }