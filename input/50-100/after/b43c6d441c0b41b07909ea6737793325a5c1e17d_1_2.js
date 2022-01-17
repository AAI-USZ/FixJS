function remove(item) {
    var vv = this.unwrap();
    ASSERT(!vv.isChanged(), "folding change events not supported");

    /* Abort when no change. */
    var index = vv.value.indexOf(item);
    if (index < 0) return;
    vv.draft("value", { removes: [{ index: index, howMany: 1 }] });
    vv.value.splice(index, 1);

    runtime.maybeTouch(vv);
  }