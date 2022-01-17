function (r) {
      // With `include_docs=true`, the 'doc' attribute is set instead of 'value'.
      if (r.doc && r.doc._id) {
        r.doc.id = r.doc._id;
        delete r.doc._id;
        return r.doc;
      } else {
        if (r.value._id) {
          r.value.id = r.value._id;
          delete r.value._id;
        }
        return r.value;
      }
    }