function(len) {
    len = len || this.read_ber();
    var ret = Encoding.convert(this.slice(len), 'UTF8', 'SJIS');
    this.position += len;
    return ret;
  }