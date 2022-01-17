function() {
    var resetCount = 0;
    var models = col.models;
    col.bind('reset', function() { resetCount += 1; });
    col.reset([]);
    equal(resetCount, 1);
    equal(col.length, 0);
    equal(col.last(), null);
    col.reset(models);
    equal(resetCount, 2);
    equal(col.length, 4);
    equal(col.last(), a);
    col.reset(_.map(models, function(m){ return m.attributes; }));
    equal(resetCount, 3);
    equal(col.length, 4);
    ok(col.last() !== a);
    ok(_.isEqual(col.last().attributes, a.attributes));
  }