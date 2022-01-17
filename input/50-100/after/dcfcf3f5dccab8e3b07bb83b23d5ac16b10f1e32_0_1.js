function(request, response) {
  var staticHandler = this.staticHandler,
    actHandler = this.actHandler;

  if(actHandler.canHandle(request)) {
    actHandler.handleRequest(request, response);
  }
  else if(staticHandler.canHandle(request)) {
    staticHandler.handleRequest(request, response);
  }
  else {
    this.defaultHandler.handleRequest(request, response);
  }
}