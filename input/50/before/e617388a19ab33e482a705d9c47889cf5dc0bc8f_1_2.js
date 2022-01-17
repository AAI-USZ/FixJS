function(req, sender, func){
  var handler = onRequestHandlers[req.request];
  handler && handler.apply(this, arguments);
}