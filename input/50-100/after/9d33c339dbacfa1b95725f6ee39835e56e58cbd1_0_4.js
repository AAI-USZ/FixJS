function sort(f) {
    var vv = this.unwrap();
    ASSERT(!vv.isChanged(), "folding change events not supported");

    vv.changeEvent = { set: true };

    runtime.touch(vv);
    
    vv.value.sort(f);
  }