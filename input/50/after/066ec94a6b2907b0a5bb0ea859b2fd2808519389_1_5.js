function () {
      var p = new Person({ name: { last: ' smith  ' }});
      assert.equal(p.updateIndex()[0], 'smith');
    }