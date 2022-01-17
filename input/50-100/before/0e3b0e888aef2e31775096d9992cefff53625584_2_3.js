function(domain, category, callbacks){
              
              //delete the queue
              delete self.categories[domain][category];
              
              //ask again for the answer
              self.domainInCategories(domain, category.split('_'), function(answer){
                //Tell it all callbacks in the original queue
                for(var i in callbacks){
                  callbacks[i](answer);
                }
                
              });
              
            }