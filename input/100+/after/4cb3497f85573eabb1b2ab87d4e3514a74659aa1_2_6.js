function(){
  var self = this;
  
  if(this.connection_problem){
    this.core.log.error({error:'No clear possible', source:'Redis clearDomains'});
    return;
  }
  
  this.client.keys(this.prefix + ':category:*', function(err, results){
    if(err) self.core.log.error({error:err, source:'Redis clearDomains'});
    var transaction = self.client.multi();
    for(var i in results){
      transaction.del(results[i]);
    }
    transaction.exec(function(err){
      self.core.log.error({error:err, source:'Redis clearDomains'});
    });
  });
}