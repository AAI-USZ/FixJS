function(models, options) {
    var self = this;
    _.each(models, function(model) {
      if (model && model.destroy) {
        model.destroy({wait: true});
      }
    });
    self.fetch();
  }