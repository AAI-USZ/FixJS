function deepResovle(self, filepath, result) {

  // get no deep dependencies
  var cache = self.cache.dependencies[filepath];
  var build = self.build.dependencies[filepath];

  // don't double resolve this
  if (result.indexOf(filepath) !== -1) {
    console.log('already resolved: ' + filepath);
    return;
  }
  result.push(filepath);

  // this filepath has already been resolved
  if (build) {
    console.log('already build: ', build);
    result.push.apply(result, build);
    return;
  }

  // Deep resolve cache
  cache.forEach(function (filepath) {
    deepResovle(self, filepath, result);
  });
}