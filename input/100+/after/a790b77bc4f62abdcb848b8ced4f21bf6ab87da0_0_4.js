function (source, modulename, cb) {

  var isPath, resolved, searchQuery, result, index;
  var dirMap = this.cache.dirMap;
  var base = path.resolve('/', path.dirname(source));

  resolved = this.cache.resolved;
  resolved = resolved[base] || (resolved[base] = {});

  isPath = modulename[0] === '.' || modulename[0] === '/';

  // normalize ./ ../ and / relative to base
  if (isPath) {
    modulename = path.resolve(base, modulename);
  }

  // check and read cache
  result = resolved[modulename];
  if (result) {
    return cb(null, result);
  }

  // set cache and execute callback
  function callback(error, result) {
    if (error === null) {
      resolved[modulename] = result;
    }

    return cb(error, result);
  }

  // resolve serach query
  searchQuery = [];
  if (isPath) {
    searchQuery.push( path.dirname(modulename) );
  } else {
    index = base.length;
    while (index !== 0) {
      searchQuery.push( path.join(base.slice(0, index), 'modules') + '/');
      index = base.lastIndexOf('/', index - 1);
    }

    searchQuery.push('/modules/');
    searchQuery.push('/');
  }

  // search each query
  function searchBase(base, filename, isPath, callback) {
    var basename = path.resolve(base, filename);

    // return no path
    filename = searchArray(dirMap, basename);
    if (filename) {
      return callback(null, filename);
    }

    // return .js path
    filename = searchArray(dirMap, basename + '.js');
    if (filename) {
      return callback(null, filename);
    }

    // return .json path
    filename = searchArray(dirMap, basename + '.json');
    if (filename) {
      return callback(null, filename);
    }

    // if input was an path, do search more
    if (isPath) {
      return callback(null, false);
    }

    // resolve and return /package.json path
    filename = searchArray(dirMap, path.resolve(basename, 'package.json'));
    if (filename) {
      fs.readFile(filename, 'utf8', function (error, content) {
        if (error) return callback(error, null);

        // resolve filepath using main property and fallback to index.js
        var pkg = JSON.parse(content);
        if (pkg.main) {
          filename = path.resolve(basename, pkg.main);
        } else {
          filename = path.resolve(basename, 'index.js');
        }

        callback(null, filename);
      });

      return;
    }

    // return /index.js
    filename = searchArray(dirMap, path.resolve(basename, 'index.js'));
    if (filename) {
      return callback(null, filename);
    }

    // not found, stop search
    return callback(null, false);
  }

  (function level(i) {
    searchBase(searchQuery[i], modulename, isPath, function (error, filepath) {
      if (error) return callback(error, null);

      if (isPath === false && filepath === false && searchQuery[i] !== '/') {
        return level(i + 1);
      }

      callback(null, filepath);
    });
  })(0);
}