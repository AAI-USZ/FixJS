function(options){
  this.statusman = new StatusManager();
  this.options = options;
  this.mediaTypes = new Reaper();
  this.port = options.port || 80;
  this.protocol = options.protocol || 'http';
  this.resourceDir = options.resourceDir || './resources';
  this.resourcePath = options.resourcePath || '/api';
  this.staticDir = options.staticDir || './static';
  this.options = this.extend(options,
                             {port : this.port,
                              protocol : this.protocol,
                              resourcePath : this.resourcePath,
                              staticDir : this.staticDir,
                              resourceDir : this.resourceDir});
  this.router = new Router(this.resourcePath);
  this.assignErrorHandlers();
}