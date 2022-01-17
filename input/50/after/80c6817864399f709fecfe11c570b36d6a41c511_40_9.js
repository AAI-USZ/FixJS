function() {
      var _ref;
      if ((_ref = dataStructureCur.attributeDescriptor) == null) {
        dataStructureCur.attributeDescriptor = {};
      }
      return dataStructureCur.attributeDescriptor[componentCur.id] = componentCur;
    }