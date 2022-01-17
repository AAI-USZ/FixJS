function(c) {
      var doc, name, numDocs, _ref;
      numDocs = 0;
      _ref = c.docs;
      for (name in _ref) {
        doc = _ref[name];
        if (doc.state !== 'closed' || doc.autoOpen) {
          numDocs++;
        }
      }
      if (numDocs === 0) {
        return c.disconnect();
      }
    }