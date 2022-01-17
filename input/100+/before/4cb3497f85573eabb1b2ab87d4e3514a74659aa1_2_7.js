function(err, elements){
    
    if(err) self.core.log.error({error:err, source:'Redis getRules'});

    //start a tranasaction
    var transaction = self.client.multi();
    
    if(elements && elements.length > 0){
      for(var i in elements){
        transaction.get(elements[i]);
      }

      transaction.exec(function(err, results){
        if(err) self.core.log.error({error:err, source:'Redis getRule'});
        
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
    
  }