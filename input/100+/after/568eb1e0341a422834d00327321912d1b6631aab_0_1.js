function(queryObj) {
    var self = this;
    var dfd = $.Deferred();
    this.trigger('query:start');

    if (queryObj) {
      this.queryState.set(queryObj, {silent: true});
    }
    var actualQuery = this.queryState.toJSON();

    this._store.query(actualQuery, this.toJSON())
      .done(function(queryResult) {
        self._handleQueryResult(queryResult);
        self.trigger('query:done');
        dfd.resolve(self.currentRecords);
      })
      .fail(function(arguments) {
        self.trigger('query:fail', arguments);
        dfd.reject(arguments);
      });
    return dfd.promise();
  }