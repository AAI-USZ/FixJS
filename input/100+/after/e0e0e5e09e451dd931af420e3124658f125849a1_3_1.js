function() {
        var self=this;

        dom.removeClass(BODY, className);
        dom.fireEvent(window, "resize");

        if (self.extendedInfo) {
          self.extendedInfo.stop();
          self.extendedInfo = null;
        }

        self.visible = false;
      }