function (searchname) {
    cache[searchname].forEach(function (filepath) {
      deepResovle(self, searchname, filepath, result);
    });
  }