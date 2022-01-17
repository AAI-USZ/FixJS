function(err) {
  if (this.error) {
    return;
  }

  this.error = err;
  this.pause();
  this.emit('error', err);

  this.openedFiles.forEach(function(file) {
    file._writeStream.destroy();
    setTimeout(fs.unlink, 0, file.path);
  });
}