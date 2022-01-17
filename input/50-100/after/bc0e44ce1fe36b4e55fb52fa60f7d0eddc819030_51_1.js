function(type, files) {
  if (type === 'deleted') {
    files.forEach(function(f) { imageDeleted(f); });
  }
  else if (type === 'created') {
    files.forEach(function(f) { imageCreated(f); });
  }
}