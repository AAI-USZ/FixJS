function handleMap(self, filepath, callback) {
  filepath = path.resolve(self.piccolo.get('modules'), './' + filepath);

  fs.readFile(filepath, 'utf8', function (error, content) {
    if (error) return callback(error, null);

    // Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
    // because the buffer-to-string conversion in `fs.readFile()`
    // translates it to FEFF, the UTF-16 BOM.
    if (content.charCodeAt(0) === 0xFEFF) {
      content = content.slice(1);
    }

    callback(null, content);
  });
}