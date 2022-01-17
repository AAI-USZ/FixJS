function (headers) {
  var self = this;
  _.each(headers, function(val, key) {
    self.addHeader(key, val);
  });
  return this;
}