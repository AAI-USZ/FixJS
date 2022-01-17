function() {
    var self = this;
    self.model.hiddenPairs.fetch({success: function(collection, response) {
      self.update();
      self.model.sync();
    }});
  }