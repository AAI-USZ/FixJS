function(nc) {
    var self = this;
    this.nc = nc;
    
    this.lasty = 0;
    this.speedy = 0;
    this.lasttime = 0;    
    this.snapy = false;
    this.demuly = 0;
    
    this.lastscrolly = -1;
    
    this.chky = 0;
    
    this.timer = 0;
    
    this.time = function() {
      return (new Date()).getTime();
    };
    
    this.reset = function(py) {
      self.stop();
      self.lasttime = self.time();
      self.speedy = 0;
      self.lasty = py;
      self.lastscrolly = -1;
    };
    
    this.update = function(py) {
      self.lasttime = self.time();
      var dy = py - self.lasty;
      var sy = nc.getScrollTop();
      var newy = sy + dy;
      self.snapy = (newy<0)||(newy>self.nc.page.maxh);
      self.speedy = dy;
      self.lasty = py;
    };
    
    this.stop = function() {
      if (self.timer) {
        clearTimeout(self.timer);
        self.timer = 0;
        self.lastscrolly = -1;
      }    
    };
    
    this.doSnapy = function(ny) {
      if (ny<0) {
        self.nc.doScroll(0,60);
      }
      else if (ny>self.nc.page.maxh) {
        self.nc.doScroll(self.nc.page.maxh,60);
      }
    };
    
    this.doMomentum = function(tm) {
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
    
  }