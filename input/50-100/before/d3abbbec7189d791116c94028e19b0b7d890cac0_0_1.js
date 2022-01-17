function() {
    equals(col.first(), a, "a should be first");
    equals(col.last(), d, "d should be last");
    col.comparator = function(model) { return model.id; };
    col.sort();
    equals(col.first(), d, "d should be first");
    equals(col.last(), a, "a should be last");
    equals(col.length, 4);
  }