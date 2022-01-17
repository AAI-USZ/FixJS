function LocalServer(options) {
  var errorHandler = this.handleError.bind(this);

  this.subDomain = options.domain || "apps";
  this.baseDomain = options.baseDomain || "feedhenry.com";

  this.staticHandler = new StaticHandler(options);
  this.actHandler = options.proxy ? new RemoteActHandler(options) : new LocalActHandler(options);

  this.server = http.createServer(this.handleRequest.bind(this));

  this.server.on("error", errorHandler);
  this.actHandler.on("error", errorHandler);
  this.staticHandler.on("error", errorHandler);
  this.defaultHandler = new RequestHandler();
}