function(filepath) {
    return 'docs/' + path.basename(filepath).replace('.', '_') + '.html';
  }