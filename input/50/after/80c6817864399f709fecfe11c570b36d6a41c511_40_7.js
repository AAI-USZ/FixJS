function() {
      var _ref;
      if ((_ref = dataStructureCur.dimensionDescriptor) == null) {
        dataStructureCur.dimensionDescriptor = {};
      }
      return dataStructureCur.dimensionDescriptor[componentCur.id] = componentCur;
    }