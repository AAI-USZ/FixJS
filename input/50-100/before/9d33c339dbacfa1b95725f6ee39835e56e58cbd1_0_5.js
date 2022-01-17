function unshift() {
    var vv = this.unwrap();
    ASSERT(!vv.isChanged(), "folding change events not supported");

    vv.changeEvent = {
      adds: [{ index: 0, howMany: arguments.length }]
    };
    Array.prototype.unshift.apply(vv.value, arguments);

    runtime.touch(vv);

    return vv.value.length;
  }