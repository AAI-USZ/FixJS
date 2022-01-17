function() {
      var l = self.lasttime;
      var t = self.time();
      
      self.speedy = Math.min(60,self.speedy);
      
      var chk = l && (t - l) <= 50;
      var sy = (self.speedy && chk) ? self.speedy : false;
      
      if (sy) {
        var tm = t-l;
        var pageh = self.nc.page.maxh;
        self.demuly = 0;
        var onscroll = function(){          
          var ny = Math.floor(self.nc.getScrollTop() - (self.speedy*(1-self.demuly)));
          if ((ny<0)||(ny>pageh)) {
            self.demuly+=0.08;
          } else {
            self.demuly+=0.01;
          }
          self.nc.setScrollTop(ny);
          self.nc.showCursor(ny);
          if(self.demuly<1) {
            self.timer = setTimeout(onscroll,tm);
          } else {
            self.timer = 0;
            self.nc.hideCursor();
            self.doSnapy(ny);
          }
        };
        onscroll();
      } else {
        if (self.snapy) {
          self.doSnapy(self.nc.getScrollTop());
        }
      }      
      
    }