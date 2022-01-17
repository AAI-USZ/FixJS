function(attrs) {
      var _ref;
      if ((_ref = groupCur.attributes) == null) {
        groupCur.attributes = {};
      }
      return groupCur.attributes[attrs.id] = attrs.value;
    }