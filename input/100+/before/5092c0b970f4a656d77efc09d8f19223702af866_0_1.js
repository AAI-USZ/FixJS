function(url) {
  var package = function(req, res, next) {
    return package.router(req, res, next);
  };

  _.extend(package, {
    url: url,
    paths: [],
    functionsToStrip: [],
    minimizer: Minimizers.None,
    shouldPackage: false,
    cacher: null,
    explicitlyUseBrowserRequire: null
  });

  _.extend(package, packageMethods);
  
  package.router = package._buildRouter();

  return package;
}