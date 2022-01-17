function (next) {
    var self = this;

    // TODO: remember if we already keywordized() manually and don't bother redoing in that case

    var changed = this.isNew || fields.some(function (field) {
      return self.isModified(field);
    });

    if (changed) this.updateIndex();
    next();
  }