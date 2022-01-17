function() {
    equal(col.get(0), d);
    equal(col.get(2), b);
    equal(col.getByCid(col.first().cid), col.first());
  }