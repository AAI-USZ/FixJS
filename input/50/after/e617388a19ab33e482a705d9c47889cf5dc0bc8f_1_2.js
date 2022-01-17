function(req, sender, func){
  var handler = onRequestHandlers[req.request];
  if (handler) {
    handler.apply(this, arguments);
    return true;
  }
}