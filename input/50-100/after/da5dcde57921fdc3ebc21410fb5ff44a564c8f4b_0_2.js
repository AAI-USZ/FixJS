function() {
      var mh = new MultiHash();
      mh.add({ hello: 'bob' });
      assert.equal(mh.length, 1);
      mh.add(null);
      assert.equal(mh.length, 1);
    }