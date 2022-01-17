function() {
      var rawBits = this.getUintField(4);
      var s = ((rawBits >> 31) === 0) ? 1 : -1;

      //Make it unsigned.
      var e = ((rawBits >> 23) & 0xff);
      e = e >>> 0;

      //Make it unsigned.
      var m = (e === 0) ? (rawBits & 0x7fffff) << 1 : (rawBits & 0x7fffff) | 0x800000;
      m = m >>> 0;

      var value = s * m * Math.pow(2, e - 150);
      return value;
    }