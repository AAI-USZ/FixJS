function(keys, domain, callback){
  var self = this;  
  var transaction = this.client.multi();
  var parts = domain.split('.');
  
  while(parts.length > 1){
    for(var i in keys){            
      transaction.sismember(this.prefix + ':category:' + keys[i], parts.join('.'));              
    }
    parts.shift();           
  }
    
  
  transaction.exec(function(err, results){
    if(err) self.core.log.error({error:err, source:'Redis containsDomain'});
    callback(results.indexOf(1) > -1);
  });  
}