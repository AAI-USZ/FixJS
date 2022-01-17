function() {
    self.gzipped = gzip.sync(null, self.buf, {});
    self.gzippedLength = self.gzipped.length;
  }