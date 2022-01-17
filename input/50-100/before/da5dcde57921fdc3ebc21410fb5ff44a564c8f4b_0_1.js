function() {
      var mh = new MultiHash();
      mh.add({ hello: 'bob' });
      mh.add({ hello: 'joe' });
      assert.lengthOf(mh, 1);
      assert.equal(mh.keys()[0], 'hello');
      assert.equal(mh.values('hello')[0], 'bob');
      assert.equal(mh.values('hello')[1], 'joe');
    }