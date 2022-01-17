function() {
    equal(col.first(), a, "a should be first");
    equal(col.last(), d, "d should be last");
    col.comparator = function(model) { return model.id; };
    col.sort();
    equal(col.first(), d, "d should be first");
    equal(col.last(), a, "a should be last");
    equal(col.length, 4);
  }