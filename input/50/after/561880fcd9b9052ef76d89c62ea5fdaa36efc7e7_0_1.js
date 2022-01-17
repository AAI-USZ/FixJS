function(filepath) {
    return 'docs/' + path.basename(filepath) + '_' + path.extname(filepath).replace('.', '') + '.html';
  }