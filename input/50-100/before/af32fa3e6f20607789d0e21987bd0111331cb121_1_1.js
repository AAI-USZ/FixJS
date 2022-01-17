function(method, model, opts) {
    var self = this;
    console.debug('[HiddenPair.sync] method: ' + method);
    if (method == "read") {
      Backbone.sync(method, model, opts);
    } else if (method == "delete") {
      self.deleteModel(self.deleteUrl(self.collection.user, self.collection.domain.id, self.id));
    }
  }