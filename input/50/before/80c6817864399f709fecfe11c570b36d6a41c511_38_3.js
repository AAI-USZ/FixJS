function(attrs) {
      if (seriesCur.attributes == null) {
        seriesCur.attributes = {};
      }
      return seriesCur.attributes[attrs.id] = attrs.value;
    }