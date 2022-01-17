function() {
    col.fetch();
    equal(lastRequest[0], 'read');
    equal(lastRequest[1], col);
  }