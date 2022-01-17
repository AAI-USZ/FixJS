function(attrs) {
      if (headerCur.receiver == null) {
        headerCur.receiver = {};
      }
      return headerCur.receiver[attrs.id] = partyCur;
    }