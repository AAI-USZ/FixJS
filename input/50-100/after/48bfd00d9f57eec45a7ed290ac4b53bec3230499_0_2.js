function(key, value, callback) {
  var self = this;

  this.register('write', function(uuid, cb) {

    var osKey = key + ':' + value;
    var obj = {
      key: key,
      value: value
    };

    setValue(gazel.setsOsName, self.trans, uuid,
      osKey, obj, cb, self.handleError.bind(self), self);

  }, callback);

  return this;
}