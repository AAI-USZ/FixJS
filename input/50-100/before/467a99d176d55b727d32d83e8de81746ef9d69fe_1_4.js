function(){
          self.scroll.y = Math.round(self.getScrollTop() * (1/self.scrollratio.y));
          self.noticeCursor();
        }