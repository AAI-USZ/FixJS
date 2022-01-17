function(lists, items, callback){
  
  var self = this;  
  var transaction = this.client.multi();
  
  if(!(lists instanceof Array)) lists = [lists];
  if(!(items instanceof Array)) items = [items];
  
  if(this.connection_problem){
    if(callback) callback(false);
    this.core.log.error({error:'No search possible', source:'Redis listContainsItems'});
    return;
  }
    
  for(var i in items){
    for(var x in lists){            
      transaction.sismember(this.prefix + ':category:' + lists[x], items[i]);              
    }
  }
    
  
  transaction.exec(function(err, results){
    if(err) self.core.log.error({error:err, source:'Redis listContainsItems'});
    callback(results.indexOf(1) > -1, results);
  });  
}