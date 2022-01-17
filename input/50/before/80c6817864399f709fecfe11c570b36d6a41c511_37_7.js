function(attrs) {
      if (dsdCur.dimensionGroupDescriptor == null) {
        dsdCur.dimensionGroupDescriptor = {};
      }
      return dsdCur.dimensionGroupDescriptor[comp.id] = comp;
    }