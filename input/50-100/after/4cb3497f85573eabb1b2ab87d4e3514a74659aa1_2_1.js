function(config, core){
  
  this.host     = config.host;
  this.port     = config.port;
  this.password = config.password;
  this.prefix   = config.prefix || 'sentry';
  //TODO select database
  
  this.core = core;
  this.connection_problem = false;
  this.aa = 'JOOOO';
  this.open();
  
  if(!this.core){
    this.core = {
      log:{
        error: console.log
      }
    };
  }
  
}