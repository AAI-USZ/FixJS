function(tm) {
      var t = self.time();
      var l = (tm) ? t+tm : self.lasttime;
      
      self.speedy = Math.min(60,self.speedy);
      
      var chk = l && (t - l) <= 50;
      var sy = (self.speedy && chk) ? self.speedy : false;
      
      if (sy) {
        var tm = t-l;
        var pageh = self.nc.page.maxh;
        self.demuly = 0;
        
        self.lastscrolly = self.nc.getScrollTop();
        self.chky = self.lastscrolly;
        
        var onscroll = function(){          
//          var ny = Math.floor(self.nc.getScrollTop() - (self.speedy*(1-self.demuly)));
          var ny = Math.floor(self.lastscrolly - (self.speedy*(1-self.demuly)));
          if ((ny<0)||(ny>pageh)) {
            self.demuly+=0.08;
          } else {
            self.demuly+=0.01;
          }
          self.lastscrolly = ny;
          
          self.nc.synched("domomentum",function(){
          
            var scy = self.nc.getScrollTop();          
            if (scy!=self.chky) self.stop();          
            self.chky=ny;
          
            self.nc.setScrollTop(ny);
            if(self.timer) {
              self.nc.showCursor(ny);              
            } else {
              self.nc.hideCursor();
              self.doSnapy(ny);
            }
          });
          
          if(self.demuly<1) {
            self.timer = setTimeout(onscroll,tm);
          } else {
            self.timer = 0;
//            self.nc.hideCursor();
//            self.doSnapy(ny);
          }
        };
        onscroll();
      } else {
        if (self.snapy) {
          self.doSnapy(self.nc.getScrollTop());
        }
      }      
      
    }