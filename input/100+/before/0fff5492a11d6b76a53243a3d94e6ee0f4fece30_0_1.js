function (id, obj, callback) {
  var key = this.key;

  if (this.schema.properties[key] && this.schema.properties[key].sanitize) {
    id = this.schema.properties[key].sanitize(id);
  }

  if (this._timestamps) {
    obj.mtime = Date.now();
  }

  var self = this,
      partialSchema = { properties: {} },
      validate;

  Object.keys(obj).forEach(function (key) {
    if (self.schema.properties[key]) {
      partialSchema.properties[key] = self.schema.properties[key];
    }
  });

  validate = this.prototype.validate({ _properties: obj }, partialSchema);

  if (!validate.valid) {
    var e = { validate: validate, value: obj, schema: this.schema };
    this.emit('error', e);
    if (callback) {
      callback(e);
    }
    return;
  }
  var newid = this.lowerResource + "/" + id,
  oldid = id;
  obj[key] = newid;
  obj.resource = this._resource;
  return id
    ? this._request('update', newid, obj, function(err, result){
      if(result) {
        result[key] = oldid;
      }
      callback(err, result);
    })
    : callback && callback(new Error('key is undefined'));
}