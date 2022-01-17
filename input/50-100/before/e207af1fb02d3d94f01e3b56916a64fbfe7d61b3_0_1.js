function() {
      var self = this;
      window._ = window.gettext = function() {
        return self.gettext.apply(self, arguments);
      };
      window.ngettext = function(singular, plural, n) {
        return self.ngettext.apply(self, arguments);
      };
      return this;
    }