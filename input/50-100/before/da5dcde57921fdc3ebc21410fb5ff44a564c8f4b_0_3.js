function() {
      var mh = new MultiHash();
      mh.put('hello', 'world');
      mh.put('foo', 'bar');
      assert.lengthOf(mh, 2);
      mh.del('hello')
      assert.lengthOf(mh, 1);
      assert.equal(mh.values('foo')[0], 'bar');
    }