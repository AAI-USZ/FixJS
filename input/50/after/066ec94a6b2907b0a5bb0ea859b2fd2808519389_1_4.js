function () {
      var p = new Person({ name: { last: 'smith', first: 'smith' }});
      assert.equal(1, p.updateIndex().length);
    }