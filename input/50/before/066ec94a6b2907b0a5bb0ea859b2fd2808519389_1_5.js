function () {
      var p = new Person({ name: { last: ' smith  ' }});
      assert.equal(p.keywordize()[0],'smith');
    }