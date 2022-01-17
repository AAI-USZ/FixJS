function() {
    assert(!is_eof());
    return this.view.getUint8(this.position++);
  }