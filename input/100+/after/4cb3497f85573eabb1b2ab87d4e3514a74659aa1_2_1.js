function(){
  var self = this;

  //create the ladp client
  this.client = redis.createClient(this.port, this.host);
  
  this.client.on("error", function (err) {    
    self.core.log.error({error:err, source:'Redis onError'});
    
    if(err.toString().match(/ECONNREFUSED/)){
      self.connection_problem = true;
    }
  });
  
  this.client.on("connect", function () {
    self.connection_problem = false;
  });
  
  //authenticate
  if(this.password){
    this.client.auth(this.password);
  }

}