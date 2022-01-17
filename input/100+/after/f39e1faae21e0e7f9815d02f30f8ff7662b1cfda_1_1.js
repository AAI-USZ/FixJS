function(ctx, fn) {
  var store = this.store;

  debug('resource changed');

  switch(ctx.req.method) {
    case 'DELETE':
      return store.remove(fn);
    break;
    case 'PUT':
      var properties = ctx.body && ctx.body.properties
        , renames;
      if(properties) {
        Object.keys(properties).forEach(function (key) {
          if(properties[key] && properties[key].$renameFrom) {
            renames = renames || {};
            renames[properties[key].$renameFrom] = key;
            delete properties[key].$renameFrom;
          }
        })
      }

      if(renames) {
        debug('renaming', renames);
        store.update({}, {$rename: renames}, function (err) {
          fn(err, ctx.body);
        });
        return;
      }
    break;
  }

  fn(null, ctx.body);
}