function(p) {
      var v = params[p];
      if (typeof v === 'string') {
        v = { type: v };
      }
      if (typeof v.required === "undefined") v.required = true;

      if (!types[v.type]) throw "unknown type specified in WSAPI:" + v.type;
      params[p] = v;
    }