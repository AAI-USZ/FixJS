function (file) {
  if (/\.js$/.test(file)) {
    require(path.join(__dirname, 'filters', file));
  }
}