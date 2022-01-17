function() {
    assert(!is_eof());
    var ret = this.view.getFloat64(this.position, true);
    this.position += 64 / 8;
    return ret;
  }