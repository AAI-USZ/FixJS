function(libName) {
  var fileNameFields = libName.match(WindowsCppEntriesProvider.FILENAME_RE);
  if (!fileNameFields) return;
  var mapFileName = fileNameFields[1] + '.map';
  this.moduleType_ = fileNameFields[2].toLowerCase();
  try {
    this.symbols = read(mapFileName);
  } catch (e) {
    // If .map file cannot be found let's not panic.
    this.symbols = '';
  }
}