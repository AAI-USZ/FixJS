function makeRequest(req, res, next, logger) {

    // 'https://ssl.nowall.be/search?hl=zh-CN&site=&source=hp&q=test&btnK=Google+%E6%90%9C%E7%B4%A2&px!=https:www.google.com'
    // fix google search
    var url = req.url;
    if(url.indexOf('px!=' < 0) && url.match(/\/search?.*q=.*/)) {
      req.url = url + '&px!=https:www.google.com'
    }
    // -------- decode req and do request -----------
    var req_option = req.encoder.decodeRequest(req);

    if(!req_option) return next();

    var scheme;
    if(req_option.isSecure) {
      scheme = https;
    } else {
      scheme = http;
    }

    var clientRequest = scheme.request(req_option, function(clientResponse) {
        logger.debug('clientResponse callback');
        req_option.encoder = req.encoder;
        req.plugins.handle(req_option, clientResponse, req, res, next, logger);
    });

    // setTimeout, config it, long pull
    if(options.timeout) {

      var timeoutTimer = setTimeout(function() {
          clientRequest.abort()
          var e = new Error("ETIMEDOUT")
          e.code = "ETIMEDOUT"
          clientRequest.emit("error", e)
      }, options.timeout)

      clientRequest.on('end', function() {
          clearTimeout(timeoutTimer);
      });

    }

    clientRequest.on('error', function(err) {
        next(err);
    });

    decodeRequestBodyTo(req, clientRequest);

  }