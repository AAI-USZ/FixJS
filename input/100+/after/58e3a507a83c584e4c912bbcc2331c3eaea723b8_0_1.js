function deepResovle(self, searchname, filepath, result) {

  // get no deep dependencies
  var cache = self.cache[searchname].dependencies[filepath];
  var build = self.build[searchname].dependencies[filepath];

  // don't double resolve this
  if (result[searchname].indexOf(filepath) !== -1) {
    return;
  }
  result[searchname].push(filepath);

  // this filepath has already been resolved
  if (build && build[searchname]) {
    result[searchname].push.apply(result[searchname], build[searchname]);
    return;
  }

  // Deep resolve cache
  if (cache) {
    Object.keys(cache).forEach(function (searchname) {
      cache[searchname].forEach(function (filepath) {
        deepResovle(self, searchname, filepath, result);
      });
    });
  }
}