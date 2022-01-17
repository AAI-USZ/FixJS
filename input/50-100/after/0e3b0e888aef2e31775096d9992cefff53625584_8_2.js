function(user){
      if(user && user.memberOf){
        if(self.ous.indexOf(user.dn.replace(/^CN=(.+?),/, '')) != -1){
          callback();
          return;
        }
      }
      callback('STOP');
    }