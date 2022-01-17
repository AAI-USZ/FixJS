function (file) {
  if ('.js' === path.extname(file)) {
    require(path.join(__dirname, 'filters', file));
  }
}