function dependenciesList(self, filepath, cache) {
  // default cache to no cache
  if (!cache) cache = [];

  // get prebuild dependencies map
  var dependencies = self.build.dependencies[filepath];

  // don't include cached files
  dependencies = dependencies.filter(function (filepath) {
    return (cache.indexOf(filepath) === -1);
  });

  return dependencies;
}