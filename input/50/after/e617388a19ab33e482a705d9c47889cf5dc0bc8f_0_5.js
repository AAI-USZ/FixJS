function(req, sender, func) {
  var handler = onRequestsHandlers[req.request];
  if (handler) {
    handler.apply(this, arguments);
    return true;
  }
}