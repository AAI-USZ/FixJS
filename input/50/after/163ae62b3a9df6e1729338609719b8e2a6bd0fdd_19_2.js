function() {
        dom.removeClass(BODY, className);
        dom.fireEvent(window, "resize");
        this.visible = false;
      }