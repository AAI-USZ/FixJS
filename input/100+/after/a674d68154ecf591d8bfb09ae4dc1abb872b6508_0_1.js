function (type, name, cb) {
  cb = cb || function () {};
  var self = this
    , edges = getRequires.call(this, type, name)
    , opts = this._opts;

  function iterator (key, next) {
    var def = getSpec(self._definitions, key)
      , ns = def._opts.type
      , action = self._types[ns].action;
    self.emit([ ns, 'pre' ], def);
    action(def, function done (err) {
      if (err) self.emit([ ns, 'error' ], err, def);
      else self.emit([ ns, 'post' ], def);
      next(err);
    });
  }

  if (opts.strategy === 'parallel')
    breeze.dag(edges, opts.concurrency, iterator, cb);
  else
    breeze.dagSeries(edges, iterator, cb);
}