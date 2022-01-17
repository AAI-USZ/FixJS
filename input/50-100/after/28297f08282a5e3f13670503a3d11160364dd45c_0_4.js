function (modulename, cache, callback) {
  var self = this;

  // resolve the module name, so it match cache object
  var filepath = self.resolveModule('/', modulename);

  // get prebuild dependencies map
  var dependencies = dependenciesList(self, filepath, cache);

  async.map(dependencies, handleMap.bind(null, self), callback);
}