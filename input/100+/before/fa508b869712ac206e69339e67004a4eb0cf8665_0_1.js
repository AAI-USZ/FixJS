function(s, encoding, length) {
  if (encoding == null || encoding == "ASCII") {
    if (length != null) {
      var i = 0;
      var len = Math.min(s.length, length);
      for (i=0; i<len; i++) {
        this.writeUint8(s.charCodeAt(i));
      }
      for (; i<length; i++) {
        this.writeUint8(0);
      }
    } else {
      for (var i=0; i<s.length; i++) {
        this.writeUint8(s.charCodeAt(i));
      }
      this.writeUint8(0);
    }
  } else {
    this.writeUint8Array((new TextEncoder(encoding)).encode(string.substring(0, length)));
  }
}