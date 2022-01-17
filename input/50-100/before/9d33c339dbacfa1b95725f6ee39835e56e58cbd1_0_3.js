function reverse() {
    var vv = this.unwrap();
    ASSERT(!vv.isChanged(), "folding change events not supported");

    vv.value.reverse();

    vv.changeEvent = {
      set: true
    };

    runtime.touch(vv);
  }