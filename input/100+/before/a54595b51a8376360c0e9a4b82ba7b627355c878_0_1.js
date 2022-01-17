function() {
  var ServiceProxy, buildRequestObject, defaultError, defaultTransform, handleError, makeDefaults, proxy, reqHasBody, request, _;

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

  reqHasBody = function(req) {
    switch (req.method.toLowerCase()) {
      case "get":
      case "head":
      case "del":
        return true;
      case "post":
      case "put":
        return false;
      default:
        throw new Error("I don't support HTTP " + req.method + " method yet!");
    }
  };

  buildRequestObject = function(req, hasBody, options) {
    var host, requestOpts, transformUrl;
    transformUrl = options.transformUrl, host = options.host, requestOpts = options.requestOpts;
    requestOpts = _.extend(requestOpts, {
      url: transformUrl(host, req.url),
      method: req.method.toLowerCase()
    });
    if (hasBody) {
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
    var hasBody, pipe, requestOpts;
    options = makeDefaults(options);
    hasBody = reqHasBody;
    requestOpts = buildRequestObject(req, hasBody, options);
    pipe = null;
    if (hasBody) {
      pipe = req.pipe(request(requestOpts)).pipe(res);
    } else {
      pipe = request(requestOpts).pipe(res);
    }
    return handleError(pipe, options.onError, req, res);
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