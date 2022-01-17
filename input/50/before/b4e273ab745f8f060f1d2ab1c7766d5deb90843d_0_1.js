function _getDecay (decay, callback) {
    if (typeof decay == 'undefined') {
      callback(null, +new Date() + (1000 * 60 * 5))
    }
    else {
      callback(null, decay)
    }
  }