function() {
    doc.destroy();
    equals(lastRequest[0], 'delete');
    ok(_.isEqual(lastRequest[1], doc));
  }