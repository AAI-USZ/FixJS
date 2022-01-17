function(fieldLength) {
      Util.assert(fieldLength < 8);
      return this.getField('i' + fieldLength, fieldLength);
    }