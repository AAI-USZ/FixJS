function (err, body, domain, cbdelegates) {
    if (err) {
      logger.debug(err);
      return cb(err);
    } else {
      if (! body) {
        return cb(null, null, null);
      }

      try {
        var r = parseWellKnownBody(body, domain, cbdelegates, function (err, r) {
          if (err) {
            logger.debug(err);
            cb(err);
          } else {
            logger.info(domain + ' is a valid browserid primary');
            return cb(null, r.urls, r.publicKey);
          }

        });

      } catch(e) {
        var msg = domain + ' is a broken browserid primary, malformed dec of support: ' + e.toString();
        logger.debug(msg);
        return cb(msg);
      }
    }
  }