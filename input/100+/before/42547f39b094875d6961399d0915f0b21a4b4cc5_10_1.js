function(options) {
      var self=this;

      self.subscribe("xhr_start",
        dom.addClass.curry("body", "submit_disabled"));
      self.subscribe("xhr_complete",
        dom.removeClass.curry("body", "submit_disabled"));

      sc.start.call(self, options);
    }