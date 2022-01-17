function(err, results){
        if(err) self.core.log.error({error:err, source:'Redis getRules'});
        
        var tmp = [];
        
        for(var x in results){
          var obj = JSON.parse(results[x]);
          if(obj){
            tmp.push(obj);
          }
        }
        
        callback(tmp);
      }