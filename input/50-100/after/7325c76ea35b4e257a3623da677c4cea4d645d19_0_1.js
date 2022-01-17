function() {
  var self = this;

  return function errorHandler(err, req, res, next) {
    if (res.statusCode < 400) res.statusCode = 500;
    err.url = req.url;
    err.component = req.url;
    err.action = req.method;
    err.params = req.params;
    err.session = req.session;

    self.onError(err);
    next(err);
  }
}