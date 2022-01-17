function() {
    var resetCount = 0;
    var models = col.models;
    col.bind('reset', function() { resetCount += 1; });
    col.reset([]);
    equals(resetCount, 1);
    equals(col.length, 0);
    equals(col.last(), null);
    col.reset(models);
    equals(resetCount, 2);
    equals(col.length, 4);
    equals(col.last(), a);
    col.reset(_.map(models, function(m){ return m.attributes; }));
    equals(resetCount, 3);
    equals(col.length, 4);
    ok(col.last() !== a);
    ok(_.isEqual(col.last().attributes, a.attributes));
  }