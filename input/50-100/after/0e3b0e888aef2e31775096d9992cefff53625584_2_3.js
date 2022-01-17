function(url, category, callbacks){

              //delete the queue
              delete self.categories[url][category];
              
              //ask again for the answer
              self.inCategories(url, null, category.split('_'), function(answer){

                //Tell it all callbacks in the original queue
                for(var i in callbacks){
                  callbacks[i](answer);
                }
                
              });
              
            }