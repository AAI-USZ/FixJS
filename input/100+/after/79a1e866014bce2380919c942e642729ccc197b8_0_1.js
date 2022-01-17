function() {
      var b, headerLength, messageBuffer, payloadBuffer, pos;
      payloadBuffer = this.payload();
      if (typeof payloadBuffer === 'string') {
        var encoding = 'utf8';
        var payloadBufferLength = Buffer.byteLength(payloadBuffer, encoding);
        b = new Buffer(payloadBufferLength + 1);
        b.writeZeroTerminatedString(payloadBuffer, 0, encoding);
        payloadBuffer = b;
      }
      headerLength = this.typeId != null ? 5 : 4;
      messageBuffer = new Buffer(headerLength + payloadBuffer.length);
      if (this.typeId) {
        messageBuffer.writeUInt8(this.typeId, 0);
        pos = 1;
      } else {
        pos = 0;
      }
      messageBuffer.writeUInt32(payloadBuffer.length + 4, pos);
      payloadBuffer.copy(messageBuffer, pos + 4);
      return messageBuffer;
    }