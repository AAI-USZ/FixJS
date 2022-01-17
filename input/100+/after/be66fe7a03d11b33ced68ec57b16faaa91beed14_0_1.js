function(chunk) {
    var chunkOffset = 0;
    while (chunkOffset < chunk.length) {
      switch (self._socketState) {

        case 1: // parsing length of packet
          if (chunk.length+self._lenBufferOffset >= 4) {
            chunkOffset += 4-self._lenBufferOffset;
            chunk.copy(self._lenBuffer, self._lenBufferOffset, 0, chunkOffset);
            self._payloadBuffer = new Buffer(_getResponseLength(self._lenBuffer));
            self._socketState = 2;
            self._lenBufferOffset = 0; // re-init
          } else {
            chunk.copy(self._lenBuffer, self._lenBufferOffset);
            self._lenBufferOffset += chunk.length;
            break;
          }

        case 2: // copy data and emit
          var copyLen = Math.min(self._payloadBuffer.length, chunk.length-chunkOffset);
          chunk.copy(self._payloadBuffer, self._payloadOffset, chunkOffset, chunkOffset+copyLen);
          self._payloadOffset += copyLen;
          chunkOffset += copyLen;
          if (self._payloadBuffer.length === self._payloadOffset) {
            emit(self._payloadBuffer);
            self._socketState     = 1;
            self._lenBufferOffset = 0;
            self._payloadBuffer   = null;
            self._payloadOffset   = 0;
          }
          break;
      }
    }
  }