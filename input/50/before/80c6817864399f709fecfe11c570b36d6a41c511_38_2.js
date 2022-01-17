function(attrs) {
      if (groupCur.attributes == null) {
        groupCur.attributes = {};
      }
      return groupCur.attributes[attrs.id] = attrs.value;
    }