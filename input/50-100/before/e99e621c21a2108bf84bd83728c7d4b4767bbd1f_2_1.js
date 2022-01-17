function (id, callback) {
  if (this.schema.properties._id && this.schema.properties._id.sanitize) {
    id = this.schema.properties._id.sanitize(id);
  }

  var newid = this.lowerResource + "/" + id;

  return id
    ? this._request('destroy', newid, callback)
    : callback && callback(new Error('key is undefined'));
}