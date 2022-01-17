function keepPosition(transEndCallbck) {
    var ix = status.iCoords.x;
    var cx = status.cCoords.x;
    if (ix !== cx) {
      var currentPage = pages.current;

      if (currentPage > 0) {
        pageHelper.getPrevious().moveToBegin();
      }

      if (currentPage < pages.total - 1) {
        pageHelper.getNext().moveToEnd();
      }

      pageHelper.getCurrent().moveToCenter(transEndCallbck);
    } else if (transEndCallbck) {
      transEndCallbck();
    }
  }