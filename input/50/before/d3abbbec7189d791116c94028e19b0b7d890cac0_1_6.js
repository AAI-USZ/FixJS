function() {
    doc.save({title : "Henry V"});
    equals(lastRequest[0], 'update');
    ok(_.isEqual(lastRequest[1], doc));
  }