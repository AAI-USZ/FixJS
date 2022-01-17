function(doc) {
      if (!doc.data) {
        throw new Error('invalid doc snapshot');
      }
      return doc.data;
    }