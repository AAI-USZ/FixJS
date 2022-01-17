function(e) {
      if (self.locked&&self.page.maxh==0) return true;
      if (self.opt.preservenativescrolling&&self.checkarea) {
        self.checkarea = false;
        self.nativescrollingarea = self.isScrollable(e); 
      }
      if (self.nativescrollingarea) return true; // this isn't my business
      if (self.locked) return self.cancelEvent(e);
      if (self.rail.drag) return self.cancelEvent(e);
      var delta = 0;      
      var delta = e.detail ? e.detail * -1 : e.wheelDelta / 40;
      if (delta) {        
        if (self.scrollmom) self.scrollmom.y.stop();
        self.doScrollBy(delta*self.opt.mousescrollstep);
      }
      return self.cancelEvent(e);
    }