function() {
      if (self.onsync) return;
      setAnimationFrame(function(){
        self.onsync = false;
        for(name in self.synclist){
          var fn = self.synclist[name];
          if (fn) fn.call(self);
          self.synclist[name] = false;
        }
      });
      self.onsync = true;
    }