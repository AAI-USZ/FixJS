function () {
      var p = new Person({ name: { last: 'agent', first: 'smith' }});
      assert.ok(p.updateIndex() instanceof Array);
      assert.equal(2, p.updateIndex().length);
    }