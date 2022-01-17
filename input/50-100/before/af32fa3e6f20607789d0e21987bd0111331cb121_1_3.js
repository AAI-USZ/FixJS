function(models, options) {
    var self = this;
    _.each(models, function(model) {
      console.debug('[HiddenPairs.remove] model: ' + model.id);
      if (model) {
        model.destroy({wait: true});
      }
    });
  }