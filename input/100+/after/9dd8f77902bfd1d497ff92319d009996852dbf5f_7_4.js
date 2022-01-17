function () {
    var query2 = new Query();
    query2.hint({'indexAttributeA': 1, 'indexAttributeB': -1});
    query2.options.hint.should.eql({'indexAttributeA': 1, 'indexAttributeB': -1});

    assert.throws(function(){
      var query3 = new Query();
      query3.hint('indexAttributeA');
    }, /Invalid hint/);
  }