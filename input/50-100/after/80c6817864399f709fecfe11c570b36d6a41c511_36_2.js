function(attrs) {
      var _ref;
      if ((_ref = headerCur.sender) == null) {
        headerCur.sender = {};
      }
      partyCur.id = attrs.id;
      return headerCur.sender[attrs.id] = partyCur;
    }