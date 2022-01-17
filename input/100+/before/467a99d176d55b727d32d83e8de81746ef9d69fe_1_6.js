function(y) {  //no-trans
        var py = self.getScrollTop();
        self.newscrolly = y;
        
        if (!self.bouncescroll) {
          if (self.newscrolly<0) {
            if (self.newspeedy) self.newspeedy.x = 0;
            self.newscrolly = 0;
          }
          else if (self.newscrolly>self.page.maxh) {
            if (self.newspeedy) self.newspeedy.x = self.page.maxh;
            self.newscrolly = self.page.maxh;
          }
        }

        var mg = Math.floor(Math.abs(y-py)/40);
        if (mg>0) {
          var ms = Math.min(10,mg)*100;
          self.bzscroll = (self.bzscroll) ? self.bzscroll.update(y,ms) : new BezierClass(py,y,ms,0,1,0,1);
        } else {
          self.bzscroll = false;
        }
        
        if (self.timer) return;
        
        if (py==self.page.maxh&&y>=self.page.maxh) self.checkContentSize();
        
        var sync = 1;
        
        function scrolling() {          
          if (self.cancelAnimationFrame) return true;
          
          sync = 1-sync;
          if (sync) return (self.timer = setAnimationFrame(scrolling)||1);

          var sy = self.getScrollTop();
          var sc = (self.bzscroll) ? self.bzscroll.getNow() : self.newscrolly;
          var dr=sc-sy;          
          if ((dr<0&&sc<self.newscrolly)||(dr>0&&sc>self.newscrolly)) sc = self.newscrolly;
          
          self.setScrollTop(sc);
          if (sc == self.newscrolly) {
//            clearAnimationFrame(self.timer);
            self.timer = 0;
            self.cursorfreezed = false;
            self.bzscroll = false;
            if (sc<0) self.doScroll(0);
            else if (sc>self.page.maxh) self.doScroll(self.page.maxh);
//            else self.checkContentSize();
          } else {
            self.timer = setAnimationFrame(scrolling)||1;
          }
        };
        self.cancelAnimationFrame=false;
        self.timer = 1;
        scrolling();
        
        if (py==self.page.maxh&&y>=py) self.checkContentSize();
        
        self.noticeCursor();
      }