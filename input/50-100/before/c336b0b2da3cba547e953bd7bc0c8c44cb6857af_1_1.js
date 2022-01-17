function (modelType) {
      if (modelType && modelType.indexOf("Info") >= 0) {
        modelType = modelType.substring(0, modelType.length - 4);
      }
      if (modelType && modelType.indexOf("XM") >= 0) {
        modelType = modelType.substring(3);
      }
      return modelType;
    }