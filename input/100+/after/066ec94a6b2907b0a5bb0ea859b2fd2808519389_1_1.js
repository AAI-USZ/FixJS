function () {
      var p = new Person({ name: { last: 'heckmann' }});
      assert.equal(0, p._keywords.length);
      p.updateIndex();
      assert.equal(1, p._keywords.length);
      p.name.first = 'aaron';
      p.updateIndex();
      assert.equal(2, p._keywords.length);
      p.tags = "one two three".split(" ");
      p.updateIndex();
      assert.equal(3, p._keywords.length);
      p.updateIndex();
      assert.equal(3, p._keywords.length);
    }