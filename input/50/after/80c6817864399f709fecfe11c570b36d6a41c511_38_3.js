function(attrs) {
      var _ref;
      if ((_ref = seriesCur.attributes) == null) {
        seriesCur.attributes = {};
      }
      return seriesCur.attributes[attrs.id] = attrs.value;
    }