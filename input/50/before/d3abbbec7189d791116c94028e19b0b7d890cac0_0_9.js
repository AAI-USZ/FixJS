function() {
    col.fetch();
    equals(lastRequest[0], 'read');
    equals(lastRequest[1], col);
  }