function (content, next, file) {
    var list = self.resolveSource(content);
    var exec = self.resolveModule.bind(self, file.path);

    self.cache.dependencies['/' + file.path] = list.map(exec);
    self.cache.stats['/' + file.path] = file.mtime;

    next(content);
  }