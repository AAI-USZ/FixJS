function unshift() {
    var vv = this.unwrap();
    ASSERT(!vv.isChanged(), "folding change events not supported");

    vv.changeEvent = {
      adds: [{ index: 0, howMany: arguments.length }]
    };

    runtime.touch(vv);

    return Array.prototype.unshift.apply(vv.value, arguments);
  }