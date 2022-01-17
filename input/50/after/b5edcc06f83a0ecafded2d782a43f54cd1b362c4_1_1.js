function (asReference) {
      if (asReference === true) {
        return datamap.getAll();
      }
      else {
        return $.extend(true, [], datamap.getAll());
      }
    }