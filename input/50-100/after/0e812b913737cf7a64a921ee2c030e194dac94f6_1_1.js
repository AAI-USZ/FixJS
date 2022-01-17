function (obj, field, value, callback) {
  log.debug('Database_Redis.setObjectValue()');

  var
    classname = obj.getClassName();

  this.client.set(this._createFieldKey(classname, obj.getId(), field), value, callback);
}