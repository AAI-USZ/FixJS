function () {
      var p = new Person({ name: { last: 'SmiTh' }});
      assert.equal(p.updateIndex()[0], 'smith');
    }