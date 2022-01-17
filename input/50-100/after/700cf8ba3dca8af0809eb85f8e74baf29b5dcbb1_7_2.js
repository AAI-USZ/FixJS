function push() {
    var vv = this.unwrap();
    ASSERT(!vv.isChanged(), "folding change events not supported");

    vv.draft("value", {
      adds: [{ index: vv.value.length, howMany: arguments.length }]
    });

    runtime.maybeTouch(vv);

    return Array.prototype.push.apply(vv.value, arguments);
  }