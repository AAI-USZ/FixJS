function(attrs) {
      var _ref;
      if ((_ref = headerCur.receiver) == null) {
        headerCur.receiver = {};
      }
      partyCur.id = attrs.id;
      return headerCur.receiver[attrs.id] = partyCur;
    }