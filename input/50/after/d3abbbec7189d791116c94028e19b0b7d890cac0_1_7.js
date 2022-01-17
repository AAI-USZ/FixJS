function() {
    doc.destroy();
    equal(lastRequest[0], 'delete');
    ok(_.isEqual(lastRequest[1], doc));
  }