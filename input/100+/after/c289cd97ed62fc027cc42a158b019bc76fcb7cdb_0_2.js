function BufferBuffer (S, BufferStream) {
    S.responseBuffer += BufferStream;

    // only call transform the data once we are sure, 100% sure, that we valid
    // response ending
    if (S.responseBuffer.substr(S.responseBuffer.length - 2) === LINEBREAK) {
      var chunks = S.responseBuffer.split(LINEBREAK);

      if (memcached.debug) {
        chunks.forEach(function each (line) {
          console.log(S.streamID + ' >> ' + line);
        });
      }

      S.responseBuffer = ""; // clear!
      this.rawDataReceived(S, S.bufferArray = S.bufferArray.concat(chunks));
    }
  }