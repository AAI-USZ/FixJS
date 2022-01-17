function(template, data) {
      var self=this;

      self.hideWait();
      self.hideError();
      self.hideDelay();
      dom.hide(".tospp");

      screens.form.show(template, data);
      dom.focus("input:visible:not(:disabled):eq(0)");
      // XXX jQuery.  bleck.
      if($("*:focus").length === 0) {
        dom.focus("button:visible:eq(0)");
      }
    }