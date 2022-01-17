function(e) {
            mousefocus = (self.getTarget(e)).id||true;
            self.hasmousefocus = true;
            self.noticeCursor();
          }