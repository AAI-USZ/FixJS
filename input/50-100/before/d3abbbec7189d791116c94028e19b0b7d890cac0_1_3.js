function() {
    equals(doc.url(), '/collection/1-the-tempest');
    doc.collection.url = '/collection/';
    equals(doc.url(), '/collection/1-the-tempest');
    doc.collection = null;
    var failed = false;
    try {
      doc.url();
    } catch (e) {
      failed = true;
    }
    equals(failed, true);
    doc.collection = collection;
  }