function() {
    equals(col.get(0), d);
    equals(col.get(2), b);
    equals(col.getByCid(col.first().cid), col.first());
  }