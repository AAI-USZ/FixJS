function (content, next, file) {
    self.cache.dependencies['/' + file.path] = self.resolveSource(content);

    next(content);
  }