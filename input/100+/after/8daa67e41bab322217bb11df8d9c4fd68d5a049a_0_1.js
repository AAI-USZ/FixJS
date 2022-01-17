function error(err) {
      if (404 == err.status) return next();
      next(err);
    }