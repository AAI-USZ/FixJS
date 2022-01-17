function (k) {
      if (k instanceof Array) {
        if (attrs[k[0]]) wrapNested(k[1], attrs[k[0]]);
        k = k[0];
      }

      if (attrs[k]) {
        attrs[k+"_attributes"] = attrs[k];
        delete attrs[k];
      }
    }