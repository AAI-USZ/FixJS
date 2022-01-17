function(e) {
    logger.debug(domain + ' is not a browserid primary: ' + e.toString());
    handleProxyIDP();
  }