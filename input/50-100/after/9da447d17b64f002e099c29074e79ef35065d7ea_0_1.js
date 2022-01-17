function packToBuffer(value, buffer, callback) {
  try {
    var offset = packToBufferSync(value, buffer);

    process.nextTick(function() {
      callback(null, offset);
    });
  } catch (e) {
    process.nextTick(function() {
      callback(e);
    });
  }
}