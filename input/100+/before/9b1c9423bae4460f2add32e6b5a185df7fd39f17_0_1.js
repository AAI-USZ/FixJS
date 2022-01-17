function init () {
  // build indexes
  var self = this
    , indexes = this.schema.indexes()
    , safe = this.schema.options.safe
    , count = indexes.length

  indexes.forEach(function (index) {
    var options = index[1];
    options.safe = safe;
    self.collection.ensureIndex(index[0], options, tick(function (err) {
      if (err) return self.prototype.db.emit('error', err);
      --count || self.emit('index');
    }));
  });

  this.schema.emit('init', this);
}