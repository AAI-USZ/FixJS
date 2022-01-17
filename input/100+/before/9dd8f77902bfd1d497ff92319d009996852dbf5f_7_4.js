function () {
    var query = new Query();
    query.hint('indexAttributeA', 1, 'indexAttributeB', -1);
    query.options.hint.should.eql({'indexAttributeA': 1, 'indexAttributeB': -1});

    var query2 = new Query();
    query2.hint({'indexAttributeA': 1, 'indexAttributeB': -1});
    query2.options.hint.should.eql({'indexAttributeA': 1, 'indexAttributeB': -1});

    var query3 = new Query();
    query3.hint('indexAttributeA');
    query3.options.hint.should.eql({});
  }