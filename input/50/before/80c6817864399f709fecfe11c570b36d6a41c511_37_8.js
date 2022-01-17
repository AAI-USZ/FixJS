function(attrs) {
      if (comp.dimensions == null) {
        comp.dimensions = [];
      }
      return comp.dimensions.push(this.stringBuffer);
    }