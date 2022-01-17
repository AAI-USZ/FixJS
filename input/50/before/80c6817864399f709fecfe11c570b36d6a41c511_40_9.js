function() {
      if (dataStructureCur.attributeDescriptor == null) {
        dataStructureCur.attributeDescriptor = {};
      }
      return dataStructureCur.attributeDescriptor[componentCur.id] = componentCur;
    }