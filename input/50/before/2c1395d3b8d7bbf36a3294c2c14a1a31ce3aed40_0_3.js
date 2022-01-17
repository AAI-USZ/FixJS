function() {
    assert(!is_eof());
    var ret = this.view['getUint' + v](this.position, true);
    this.position += v / 8;
    return ret;
  }