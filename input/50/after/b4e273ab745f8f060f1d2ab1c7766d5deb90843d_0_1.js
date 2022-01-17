function _getExpires (expires, callback) {
    if (typeof expires == 'undefined') {
      expires = +new Date() + (1000 * 60 * 5)
      callback(null, expires)
    }
    else 
      callback(null, expires)
  }