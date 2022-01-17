function (v) {
      var value = this[v];
      if (hd.isVariable(value)) {
        value = value();
      }
      /* Reject any constants or variables that are functions. */
      if (typeof value !== "function") {
        data[v] = value;
      }
    }