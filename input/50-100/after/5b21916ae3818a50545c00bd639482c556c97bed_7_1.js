function(transformName) {
        var transformValue;
        transformValue = _this.model.get(transformName);
        if (transformValue) {
          return transformStr += transformName + "(" + transformValue + "rad) ";
        }
      }