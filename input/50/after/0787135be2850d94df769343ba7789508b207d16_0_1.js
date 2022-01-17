function (ev) {
    sjcl.random.addEntropy((new Date()).valueOf(), 2, "loadtime");
  }