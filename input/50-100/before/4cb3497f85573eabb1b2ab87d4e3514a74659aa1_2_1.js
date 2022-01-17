function(config, core){
  
  this.host     = config.host;
  this.port     = config.port;
  this.password = config.password;
  this.prefix   = config.prefix || 'sentry';
  this.cache    = config.cache;
  //TODO select database
  
  this.core = core;
  
  this.open();
  
}