function dependenciesList(self, rootname, filepath, cache) {
  // default cache to no cache
  if (!cache) cache = { presenter: [], modules: [] };
  var response = { presenter: [], modules: [] };

  // get prebuild dependencies map
  var dependencies = self.build[rootname].dependencies[filepath];

  // don't include cached files
  Object.keys(dependencies).forEach(function (rootname) {
    response[rootname] = dependencies[rootname].filter(function (filepath) {
      return (cache[rootname].indexOf(filepath) === -1);
    });
  });

  return response;
}