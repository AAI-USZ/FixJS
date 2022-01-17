function() {
      var self = this;
      this.$el.html('');
      this.model.each(function(m) {
        self._addTable(m);
      });
    }