function() {
    doc.save({title : "Henry V"});
    equal(lastRequest[0], 'update');
    ok(_.isEqual(lastRequest[1], doc));
  }