function() {
      var mh = new MultiHash();
      mh.add({ hello: 'bob' });
      assert.lengthOf(mh, 1);
      mh.add(null);
      assert.lengthOf(mh, 1);
    }