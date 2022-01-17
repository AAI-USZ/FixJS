function() {
  var ServiceProxy, buildRequestObject, defaultError, defaultTransform, handleError, makeDefaults, proxy, request, _;

  request = require('request');

  _ = require('underscore');

  defaultTransform = function(host, url) {
    return host + url;
  };

  defaultError = function(err, req, res) {
    return res.send("an error occurred", 500);
  };

  makeDefaults = function(options) {
    if (options == null) {
      options = {};
    }
    return {
      transformUrl: options.transformUrl || defaultTransform,
      onError: options.onError || defaultError,
      host: options.host || "http://localhost",
      requestOpts: options.requestOpts || {}
    };
  };

  buildRequestObject = function(req, options) {
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
  };

  handleError = function(pipe, onError, req, res) {
    return pipe.on("error", function(exception) {
      return onError(exception, req, res);
    });
  };

  proxy = function(req, res, options) {
    var remotePipe, reqPipe, requestOpts;
    options = makeDefaults(options);
    requestOpts = buildRequestObject(req, options);
    remotePipe = req.pipe(request(requestOpts));
    handleError(remotePipe, options.onError, req, res);
    reqPipe = remotePipe.pipe(res);
    return handleError(reqPipe, options.onError, req, res);
  };

  ServiceProxy = (function() {

    function ServiceProxy(options) {
      this.savedOpts = makeDefaults(options);
    }

    ServiceProxy.prototype.proxy = function(req, res, options) {
      var allOpts;
      allOpts = _.extend(this.savedOpts, options);
      return proxy(req, res, allOpts);
    };

    return ServiceProxy;

  })();

  ServiceProxy.proxy = proxy;

  module.exports = ServiceProxy;

}