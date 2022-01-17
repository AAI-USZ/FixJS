function() {
      var mh = new MultiHash();
      mh.put('hello', 'world');
      mh.put('foo', 'bar');
      assert.equal(mh.length, 2);
      mh.del('hello')
      assert.equal(mh.length, 1);
      assert.equal(mh.values('foo')[0], 'bar');
    }