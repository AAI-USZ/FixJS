function(len) {
      if (self.ishwscroll) {
        self.rail.css({height:self.win.innerHeight()});
      } else {
        var pos = self.win.offset();
        pos.top+=2;
        var brd = (self.win.outerWidth() - self.win.innerWidth())/2;
        pos.left+= self.win.innerWidth() + brd - self.rail.width -1;
        
        var off = self.opt.railoffset;
        if (off) {
          if (off.top) pos.top+=off.top;
          if (off.left) pos.left+=off.left;
        }
        
        self.rail.css({top:pos.top,left:pos.left,height:(len)?len.h:self.win.innerHeight()});
        if (self.zoom) self.zoom.css({top:pos.top+1,left:pos.left-20});
      }
    }