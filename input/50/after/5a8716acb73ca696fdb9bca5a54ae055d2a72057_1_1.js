function unit(name, src, dst) {
    it(name, function() {
      assert.deepEqual(candor.parser.parse(src), dst);
    });
  }