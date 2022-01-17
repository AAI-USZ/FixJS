function(e) {
    logger.debug(domain + ' is not a browserid primary: ' + e.toString());
    cb(null, false, null);
  }