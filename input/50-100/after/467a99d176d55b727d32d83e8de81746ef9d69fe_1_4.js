function(e) {    
      if (self.rail.drag) return;
      if (!self.cursorfreezed) {
/*      
        self.delayed('onscroll',function(){
          self.scroll.y = Math.round(self.getScrollTop() * (1/self.scrollratio.y));
          self.noticeCursor();
        },30);
*/
        self.synched('scroll',function(){
          self.scroll.y = Math.round(self.getScrollTop() * (1/self.scrollratio.y));
          self.noticeCursor();
        });
        
      }
    }