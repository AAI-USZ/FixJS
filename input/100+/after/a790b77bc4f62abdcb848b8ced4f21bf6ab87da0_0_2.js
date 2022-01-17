function (content, next, file) {
    var list = self.resolveSource(content);
    var exec = self.resolveModule.bind(self, file.path);

    async.map(list, exec, function (error, list) {
      if (error) return next(error);

      self.cache.dependencies['/' + file.path] = list;
      self.cache.stats['/' + file.path] = file.mtime;

      next(content);
    });
  }