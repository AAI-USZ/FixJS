function isIndex(urlPath) {
    return options.indexes && path.basename(urlPath) === options.index;
  }