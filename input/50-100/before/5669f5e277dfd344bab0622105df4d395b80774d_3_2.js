function(err, data){
          if(err||(!data)) self.getCursor(forMsg, passive, callback); // someone else picked it up
          else doCallback(err, data);
        }