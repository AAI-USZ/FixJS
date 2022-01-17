function(transformName) {
        var transformValue;
        transformValue = _this.model.get(transformName);
        if (transformValue) {
          if (transformName === "scale") {
            return transformStr += transformName + "(" + transformValue + ") ";
          } else {
            return transformStr += transformName + "(" + transformValue + "rad) ";
          }
        }
      }