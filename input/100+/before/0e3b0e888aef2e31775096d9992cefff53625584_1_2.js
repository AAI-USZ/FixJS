function(type, rule_types){
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
        
      }