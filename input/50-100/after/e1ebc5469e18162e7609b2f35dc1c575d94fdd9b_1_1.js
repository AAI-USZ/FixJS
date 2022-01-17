function pop() {
    var vv = this.unwrap();
    ASSERT(!vv.isChanged(), "folding change events not supported");

    /* Abort when no change. */
    if (vv.value.length === 0) {
      return;
    }
    vv.draft("value", {
      removes: [{ index: vv.value.length - 1, howMany: 1 }]
    });

    runtime.maybeTouch(vv);

    return vv.value.pop();
  }