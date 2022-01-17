function(attrs) {
      if (headerCur.sender == null) {
        headerCur.sender = {};
      }
      partyCur.id = attrs.id;
      return headerCur.sender[attrs.id] = partyCur;
    }