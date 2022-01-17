function() {
      if (dataStructureCur.dimensionDescriptor == null) {
        dataStructureCur.dimensionDescriptor = {};
      }
      return dataStructureCur.dimensionDescriptor[componentCur.id] = componentCur;
    }