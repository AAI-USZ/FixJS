function(options, callback){
  var self = this;
  
  var match = {
    dest: false,
    src: false,
    misc: false
  };
  
  
  var callbacks = {};
  
  //build up the callbacks hash
  //every type gets is's own method {dest:function(), src:fuction}
  for(var type in match){    
    if(this[type + '_types'].length > 0){

      (function(type, rule_types){
        var rule_type_callbacks = [];
        for(var i in rule_types){
          rule_type_callbacks.push(function(callback){
            self.core.rule_types[type][rule_types[i]].call(self, options, callback);
          });
        }

        //this method will call again async.parallel to get all results from the different rule types (e.g. category and match)
        callbacks[type] = function(callback){
          async.parallel(rule_type_callbacks, function(err, results){

            //Loop over the results and combine them.
            //All results are the same -> return it. Results have differences -> return false!
            var tmp = null;
            for(var r in results){
              if(tmp == null) tmp = results[r];
              if(results[r] != tmp){
                callback(null, false);
                return;
              }
            }
            callback(null, tmp);
            
          });
        };
        
      })(type, this[type + '_types']);
      
    }else{
      match[type] = true;
    }
  }
 
  
  if(match['dest'] && match['src'] && match['misc']){
    //no valid dest, src and misc type given...
    callback(this.allowed ? true : this.redirect);
  }else{
    //parallel dest, src and misc type callback calls
    async.parallel(callbacks, function(err, results){

      if(results['dest'] != false && results['src'] != false && results['misc'] != false){
        //dest and src match
        callback(self.allowed ? true : self.redirect);
      }else{
        //no match
        callback(null);
      }
      
    });
  }
}