function packToBuffer(value, buffer, callback) {
  var offset = packToBufferWithOffsetSync(value, buffer, 0);

  process.nextTick(function() {
      callback(offset);
  });
}