function(filename) {
  var name = '';
  for (var i = 0; i < 32; i++) {
    name += Math.floor(Math.random() * 16).toString(16);
  }

  if (this.keepExtensions) {
    var ext = path.extname(filename);
    ext     = ext.replace(/(\.[a-z0-9]+).*/, '$1')

    name += ext;
  }

  return path.join(this.uploadDir, name);
}