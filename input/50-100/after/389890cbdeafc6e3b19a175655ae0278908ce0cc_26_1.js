function(fieldType, fieldLength) {
      Util.assert(fieldLength > 0);
      var field = this.data[this.index];
      this.offset += fieldLength;
      this.index++;
      Util.assert(field.type === fieldType);
      Util.assert(field.numBytes === fieldLength);
      return field.value;
    }