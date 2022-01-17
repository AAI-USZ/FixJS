function push() {
    var vv = this.unwrap();
    ASSERT(!vv.isChanged(), "folding change events not supported");

    vv.changeEvent = {
      adds: [{ index: vv.value.length, howMany: arguments.length }]
    };

    runtime.touch(vv);

    return Array.prototype.push.apply(vv.value, arguments);
  }