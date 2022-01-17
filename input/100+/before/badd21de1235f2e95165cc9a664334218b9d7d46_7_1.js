function keepPosition(transEndCallbck) {
    var ix = status.iCoords.x;
    var cx = status.cCoords.x;
    if (ix !== cx) {
      var currentPage = pages.current;

      if (currentPage > 0) {
        pageHelper.getPrevious().moveToLeft();
      }

      if (currentPage < pages.total - 1) {
        pageHelper.getNext().moveToRight();
      }

      pageHelper.getCurrent().moveToCenter(transEndCallbck);
    } else if (transEndCallbck) {
      transEndCallbck();
    }
  }