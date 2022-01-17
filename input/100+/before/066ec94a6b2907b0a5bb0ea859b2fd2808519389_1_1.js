function () {
      var p = new Person({ name: { last: 'heckmann' }});
      assert.equal(0, p.keywords.length);
      p.keywordize();
      assert.equal(1, p.keywords.length);
      p.name.first = 'aaron';
      p.keywordize();
      assert.equal(2, p.keywords.length);
      p.tags = "one two three".split(" ");
      p.keywordize();
      assert.equal(3, p.keywords.length);
      p.keywordize();
      assert.equal(3, p.keywords.length);
    }