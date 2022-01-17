function() {
      var mh = new MultiHash();
      mh.add({ foo: 'x' });
      mh.add({ bar: 'y', baz: 'z' });
      assert.equal(mh.length, 3);
      assert.equal(mh.keys()[0], 'foo');
      assert.equal(mh.values('foo')[0], 'x');
      assert.equal(mh.keys()[1], 'bar');
      assert.equal(mh.values('bar')[0], 'y');
      assert.equal(mh.keys()[2], 'baz');
      assert.equal(mh.values('baz')[0], 'z');
    }