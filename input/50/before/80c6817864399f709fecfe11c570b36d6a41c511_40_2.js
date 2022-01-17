function(attrs) {
      if (componentCur.dimension == null) {
        componentCur.dimension = [];
      }
      return componentCur.dimension.push(attrs.id);
    }