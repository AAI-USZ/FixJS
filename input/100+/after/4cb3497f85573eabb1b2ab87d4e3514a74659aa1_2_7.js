function(name, callback){
  return;
  var self = this;
  
  if(this.connection_problem){
    if(callback) callback([]);
    this.core.log.error({error:'No rules read possible', source:'Redis getRules'});
    return;
  }
  
  //get all the elements in a list (every element is a key with the rule as json encoded string)
  this.client.lrange(this.prefix  + ':rules:' +  name, 0, -1, function(err, elements){
    
    if(err) self.core.log.error({error:err, source:'Redis getRules'});

    //start a tranasaction
    var transaction = self.client.multi();
    
    if(elements && elements.length > 0){
      for(var i in elements){
        transaction.get(elements[i]);
      }

      transaction.exec(function(err, results){
        if(err) self.core.log.error({error:err, source:'Redis getRules'});
        
        var tmp = [];
        
        for(var x in results){
          var obj = JSON.parse(results[x]);
          if(obj){
            tmp.push(obj);
          }
        }
        
        callback(tmp);
      });
    }else{
      callback([]);
    }
    
  });  
}