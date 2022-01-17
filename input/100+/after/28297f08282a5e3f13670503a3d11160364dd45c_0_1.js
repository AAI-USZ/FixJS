function (source, modulename) {

  var dirMap = this.build.dirMap;
  var packageMap = this.build.packageMap;

  var base = path.resolve('/', path.dirname(source));
  var isPath = modulename[0] === '.' || modulename[0] === '/';

  // normalize ./ ../ and / relative to base
  if (isPath) {
    modulename = path.resolve(base, modulename);
  }

  // check cache
  var cache = this.cache.resolved[base] || (this.cache.resolved[base] = {});
  if (cache[modulename]) {
    return cache[modulename];
  }

  // resolve serach query
  var searchQuery = [];
  if (isPath) {
    searchQuery.unshift( path.dirname(modulename) );
  } else {
    var index = base.length;
    while (index !== 0) {
      searchQuery.unshift( path.join(base.slice(0, index), 'modules') + '/');
      index = base.lastIndexOf('/', index - 1);
    }

    searchQuery.unshift('/modules/');
    searchQuery.unshift('/');
  }

  // search each query
  function searchBase(base) {
    var basename = path.resolve(base, modulename);

    // return no path
    var filename = searchArray(dirMap, basename);
    if (filename) return filename;

    // return .js path
    filename = searchArray(dirMap, basename + '.js');
    if (filename) return filename;

    // return .json path
    filename = searchArray(dirMap, basename + '.json');
    if (filename) return filename;

    // if input was an path, do search more
    if (isPath) return false;

    // resolve and return /package.json path
    return packageMap[basename];
  }

  // find filepath
  var i = searchQuery.length, filepath;
  while (i--) {
    filepath = searchBase(searchQuery[i]);
    if (isPath || filepath) {
      return filepath;
    }
  }

  return false;
}