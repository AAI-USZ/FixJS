function() {
    // check this stream is the root
    console.assert(this.position === 0);
    console.assert(this.is_root());

    return this.read_string();
  }