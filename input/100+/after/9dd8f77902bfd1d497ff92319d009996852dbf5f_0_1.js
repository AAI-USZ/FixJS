function (conditions, options, callback) {
  if (1 === arguments.length && 'function' == typeof conditions) {
    var msg = 'Model.findOneAndRemove(): First argument must not be a function.\n\n'
              + '  ' + this.modelName + '.findOneAndRemove(conditions, callback)\n'
              + '  ' + this.modelName + '.findOneAndRemove(conditions)\n'
              + '  ' + this.modelName + '.findOneAndRemove()\n';
    throw new TypeError(msg)
  }

  if ('function' == typeof options) {
    callback = options;
    options = undefined;
  }

  var fields;
  if (options) {
    fields = options.select;
    options.select = undefined;
  }

  var query = new Query(conditions, options);
  query.bind(this, 'findOneAndRemove');
  query.select(fields);

  if ('undefined' == typeof callback)
    return query;

  this._applyNamedScope(query);
  return query.findOneAndRemove(callback);
}