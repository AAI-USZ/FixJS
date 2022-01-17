function(buffer) {
  this.append(buffer);

  while (true) {
    if (this._paused) {
      return;
    }

    if (!this._packetHeader) {
      if (this._bytesRemaining() < 4) {
        break;
      }

      this._packetHeader = new PacketHeader(
        this.parseUnsignedNumber(3),
        this.parseUnsignedNumber(1)
      );

      this._trackAndVerifyPacketNumber(this._packetHeader.number);
    }

    if (this._bytesRemaining() < this._packetHeader.length) {
      break;
    }

    this._packetEnd = this._offset + this._packetHeader.length;

    if (this._packetHeader.length === MAX_PACKET_LENGTH) {
      this._longPacketBuffers.push(this._buffer.slice(this._offset, this._packetEnd));

      this._advanceToNextPacket();
      continue;
    }

    this._combineLongPacketBuffers();

    // Try...finally to ensure exception safety. Unfortunately this is costing
    // us up to ~10% performance in some benchmarks.
    var hadException = true;
    try {
      this._onPacket(this._packetHeader);
      hadException = false;
    } finally {
      this._advanceToNextPacket();

      // If we had an exception, the parser while loop will be broken out
      // of after the finally block. So we need to make sure to re-enter it
      // to continue parsing any bytes that may already have been received.
      if (hadException) {
        process.nextTick(this.write.bind(this));
      }
    }
  }
}