function(attrs) {
      var _ref;
      if ((_ref = dsdCur.dimensionDescriptor) == null) {
        dsdCur.dimensionDescriptor = {};
      }
      return dsdCur.dimensionDescriptor[comp.id] = comp;
    }