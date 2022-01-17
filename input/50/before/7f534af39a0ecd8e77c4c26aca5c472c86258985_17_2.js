function(options) {
      var self=this;
      self.options = options || {};

      self.bind("form", "submit", cancelEvent(onSubmit));
      self.bind("input", "keypress", onKeypress);
    }