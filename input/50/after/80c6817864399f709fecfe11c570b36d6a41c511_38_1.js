function(attrs) {
      var _ref;
      if ((_ref = groupCur.groupKey) == null) {
        groupCur.groupKey = {};
      }
      return groupCur.groupKey[attrs.id] = attrs.value;
    }