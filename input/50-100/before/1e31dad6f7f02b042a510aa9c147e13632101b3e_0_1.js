function (r) {
      // With `include_docs=true`, the 'doc' attribute is set instead of 'value'.
      return r.doc || r.value;
    }