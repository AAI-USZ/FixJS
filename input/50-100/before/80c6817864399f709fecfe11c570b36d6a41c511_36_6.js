function(attrs) {
      if (headerCur.receiver == null) {
        headerCur.receiver = {};
      }
      partyCur.id = attrs.id;
      return headerCur.receiver[attrs.id] = partyCur;
    }