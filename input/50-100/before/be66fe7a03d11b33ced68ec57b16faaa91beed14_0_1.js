function(chunk) {
    var len = (chunk[0] << 24) +
              (chunk[1] << 16) +
              (chunk[2] << 8);
    var payload = new Buffer(len);
    chunk.copy(payload, 0, 4);
    handler(payload);
  }