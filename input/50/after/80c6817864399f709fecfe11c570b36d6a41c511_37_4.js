function(attrs) {
      var _ref;
      if ((_ref = dsdCur.attributeDescriptor) == null) {
        dsdCur.attributeDescriptor = {};
      }
      return dsdCur.attributeDescriptor[comp.id] = comp;
    }