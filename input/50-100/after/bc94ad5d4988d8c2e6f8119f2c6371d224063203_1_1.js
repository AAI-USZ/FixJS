function(obj) {
  var self = this;
  this.keys = {};
  this.key_deps = {};
  this.key_value_deps = {};

  _.each(obj,function(val,key) {
    self.set(key,val);
  })
}