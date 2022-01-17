function(attrs) {
      if (groupCur.groupKey == null) {
        groupCur.groupKey = {};
      }
      return groupCur.groupKey[attrs.id] = attrs.value;
    }