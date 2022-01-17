function clear() {
    var vv = this.unwrap();
    ASSERT(!vv.isChanged(), "folding change events not supported");

    vv.draft("value", { set: true });

    runtime.maybeTouch(vv);
    
    vv.value = [];
  }