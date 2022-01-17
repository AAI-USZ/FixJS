function(attrs) {
      var _ref;
      if ((_ref = dsdCur.dimensionGroupDescriptor) == null) {
        dsdCur.dimensionGroupDescriptor = {};
      }
      return dsdCur.dimensionGroupDescriptor[comp.id] = comp;
    }