function(err, results){
    if(err) self.core.log.error({error:err, source:'Redis clearDomains'});
    var transaction = self.client.multi();
    for(var i in results){
      transaction.del(results[i]);
    }
    transaction.exec();
  }