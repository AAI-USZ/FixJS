function(){
  var self = this;
  
  //create the ladp client
  this.client = redis.createClient(this.port, this.host);
  
  this.client.on("error", function (err) {
    self.core.log.error({error:err, source:'Redis onError'});
  });
  
  //authenticate
  if(this.password){
    this.client.auth(this.password);
  }

}