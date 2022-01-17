function(target){
      //purge cache, but don't remove waiting callbacks
      var self = this;

      for(var domain in this.categories){
        for(var category in this.categories[domain]){
          if(this.categories[domain][category] instanceof Array){
            //Array with callbacks waiting for a result
            (function(domain, category, callbacks){
              
              //delete the queue
              delete self.categories[domain][category];
              
              //ask again for the answer
              self.domainInCategories(domain, category.split('_'), function(answer){
                //Tell it all callbacks in the original queue
                for(var i in callbacks){
                  callbacks[i](answer);
                }
                
              });
              
            })(domain, category, this.categories[domain][category]);
            
          }else{
            delete this.categories[domain][category];
          }
        }
      }
    
    }