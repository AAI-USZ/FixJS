function(req, options) {
    var host, requestOpts, transformUrl;
    transformUrl = options.transformUrl, host = options.host, requestOpts = options.requestOpts;
    requestOpts = _.extend(requestOpts, {
      url: transformUrl(host, req.url),
      method: req.method.toLowerCase()
    });
    if (req.body != null) {
      requestOpts.body = req.body;
    }
    return requestOpts;
  }