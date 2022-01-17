function LocalServer(options) {
  this.subDomain = options.domain || "apps";
  this.baseDomain = options.baseDomain || "feedhenry.com"

  this.handlers = [];

  if(options.proxy === "true") {
    this.handlers.push(new RemoteActHandler(options));
  }
  else {
    this.handlers.push(new LocalActHandler(options));
  }

  this.handlers.push(new StaticHandler(options));

  this.server = http.createServer(this.handleRequest.bind(this));
  this.server.on("error", function(e) {
    log.verbose(e);
  });

  this.defaultHandler = new RequestHandler();
}