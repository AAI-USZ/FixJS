function (error, list) {
      if (error) return next(error);

      self.cache.dependencies['/' + file.path] = list;
      self.cache.stats['/' + file.path] = file.mtime;

      next(content);
    }