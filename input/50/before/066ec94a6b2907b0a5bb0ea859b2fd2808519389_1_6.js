function () {
      var p = new Person({ name: { last: 'SmiTh' }});
      assert.equal(p.keywordize()[0],'smith');
    }