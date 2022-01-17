function sort(f) {
    var vv = this.unwrap();
    ASSERT(!vv.isChanged(), "folding change events not supported");

    vv.value.sort(f);

    vv.changeEvent = {
      set: true
    };

    runtime.touch(vv);
  }