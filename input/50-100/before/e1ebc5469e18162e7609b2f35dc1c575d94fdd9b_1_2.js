function shift() {
    var vv = this.unwrap();
    ASSERT(!vv.isChanged(), "folding change events not supported");

    /* Abort when no change. */
    if (vv.value.length === 0) return;
    vv.draft("value", {
      removes: [{ index: 0, howMany: 1 }]
    });

    runtime.maybeTouch(vv);

    return vv.value.shift();
  }