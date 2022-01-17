function(){
      //purge cache, but don't remove waiting callbacks
      var self = this;

      for(var url in this.categories){
        
        var remove = true;
        
        for(var category in this.categories[url]){
          if(this.categories[url][category] instanceof Array){
            remove = false;
            //Array with callbacks waiting for a result
            (function(url, category, callbacks){

              //delete the queue
              delete self.categories[url][category];
              
              //ask again for the answer
              self.inCategories(url, null, category.split('_'), function(answer){

                //Tell it all callbacks in the original queue
                for(var i in callbacks){
                  callbacks[i](answer);
                }
                
              });
              
            })(url, category, this.categories[url][category]);
            
          }else{
            delete this.categories[url][category];
          }
        }
        if(remove){
          delete this.categories[url];
        }
        
      }
    
    }