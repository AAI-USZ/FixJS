function(user){
      if(user && user.memberOf){
        for(var i in user.memberOf){
          if(self.groups.indexOf(user.memberOf[i]) != -1){
            callback(null, true);
            return;
          }          
        }
      }
      callback(null, false);
    }