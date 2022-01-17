function() {
    self.gzipped = gzip.sync(null, self.buf, {});
    self.gzippedLength = Buffer.byteLength(self.gzipped.toString());
  }