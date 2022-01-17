function() {
      var self = this;
      this.table.bind('change', function() { self.fetch(); }, this);
    }