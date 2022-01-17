function() {
    console.assert(!this.is_eof());
    return this.view.getUint8(this.position++);
  }