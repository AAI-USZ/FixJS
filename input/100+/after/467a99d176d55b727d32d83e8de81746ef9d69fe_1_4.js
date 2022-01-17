function(e,page) {
    
      if (!self.haswrapper&&!self.ispage) {        
        if (self.win.css('display')=='none') {
          if (self.visibility) self.hideRail();
          return false;
        } else {
          if (!self.visibility&&(self.getScrollTop()==0)) self.doScrollTo(Math.floor(self.scroll.y*self.scrollratio.y));
          if (!self.hidden&&!self.visibility) self.showRail();
        }        
      }
    
      var premaxh = self.page.maxh;
      var premaxw = self.page.maxw;

      var preview = {h:self.view.h,w:self.view.w};
      
      self.view = {
        w:(self.ispage) ? self.win.width() : parseInt(self.win[0].clientWidth),
        h:(self.ispage) ? self.win.height() : parseInt(self.win[0].clientHeight)
      };
      
      self.page = (page) ? page : self.getContentSize();
      
      self.page.maxh = Math.max(0,self.page.h - self.view.h);
      self.page.maxw = Math.max(0,self.page.w - self.view.w);      
      
      if ((self.page.maxh==premaxh)&&(self.page.maxw==premaxw)&&(self.view.w==preview.w)) {
        // test position        
        if (!self.ispage) {
          var pos = self.win.offset();
          if (self.lastposition) {
            var lst = self.lastposition;
            if ((lst.top==pos.top)&&(lst.left==pos.left)) return self; //nothing to do            
          }
          self.lastposition = pos;
        } else {
          return self; //nothing to do
        }
      }
      
      if (self.page.maxh==0) {
        self.hideRail();        
        self.scrollvaluemax = 0;
        self.scroll.y = 0;
        self.scrollratio = {x:0,y:0};
        self.cursorheight = 0;
        self.locked = true;
        self.setScrollTop(0);
        return false;
      } 
      else if (!self.hidden&&!self.visibility) {
        self.showRail();     
        self.locked = false;
      }
      
      if (self.istextarea&&self.win.css('resize')&&self.win.css('resize')!='none') self.view.h-=20;      
      if (!self.ispage) self.updateScrollBar(self.view);

      self.cursorheight = Math.min(self.view.h,Math.round(self.view.h * (self.view.h / self.page.h)));
      self.cursorheight = Math.max(self.opt.cursorminheight,self.cursorheight);
      
      self.scrollvaluemax = self.view.h-self.cursorheight-self.cursor.hborder;
      
      self.scrollratio = {
        x:0,
        y:(self.page.maxh/self.scrollvaluemax)
      };
     
      var sy = self.getScrollTop();
      if (sy>self.page.maxh) {
        self.doScroll(self.page.maxh);
      } else {     
        self.scroll.y = Math.round(self.getScrollTop() * (1/self.scrollratio.y));
        self.noticeCursor();     
      }      
      
      return self;
    }