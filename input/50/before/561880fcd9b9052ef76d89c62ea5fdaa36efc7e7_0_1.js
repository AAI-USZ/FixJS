function(filepath) {
    return 'docs/' + path.basename(filepath, path.extname(filepath)) + '.html';
  }