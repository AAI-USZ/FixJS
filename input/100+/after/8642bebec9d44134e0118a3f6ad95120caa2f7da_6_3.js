function fetchBody(chunk) {
    var raw, event, data;
    var chunkLength = chunk.length;
    var bytesLeft = (eventLength + messageLength) - bufferJoiner.length;

    if (chunkLength >= bytesLeft) {
      raw = bufferJoiner.add(chunk.slice(0, bytesLeft)).join();
      event = JSON.parse(raw.slice(0, eventLength));
      data = messagetype ? raw.slice(eventLength) : JSON.parse(raw.slice(eventLength).toString());

      eventLength = -1;
      messageLength = -1;

      self.emit(['data'].concat(event), data);

      if (chunkLength - bytesLeft) {
        fetchHeader(chunk.slice(bytesLeft));
      }

      return;
    }

    bufferJoiner.add(chunk);
  }