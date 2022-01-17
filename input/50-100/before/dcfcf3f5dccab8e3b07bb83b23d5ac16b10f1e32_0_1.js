function(request, response) {
  var handlers = this.handlers,
    handled = false;

  for(var i = 0, il = handlers.length; i < il && !handled; i++) {
    var handler = handlers[i];

    handled = handler.canHandle(request);
    if(handled) {
      handler.handleRequest(request, response);
    }
  }

  if(!handled) {
    this.defaultHandler.handleRequest(request, response);
  }
}