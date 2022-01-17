function(attrs) {
      if (dsdCur.dimensionDescriptor == null) {
        dsdCur.dimensionDescriptor = {};
      }
      return dsdCur.dimensionDescriptor[comp.id] = comp;
    }