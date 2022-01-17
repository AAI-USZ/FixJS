function (ev) {
    var d = new Date();
    sjcl.random.addEntropy(d, 2, "loadtime");
  }