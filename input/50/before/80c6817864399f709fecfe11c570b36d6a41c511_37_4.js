function(attrs) {
      if (dsdCur.attributeDescriptor == null) {
        dsdCur.attributeDescriptor = {};
      }
      return dsdCur.attributeDescriptor[comp.id] = comp;
    }