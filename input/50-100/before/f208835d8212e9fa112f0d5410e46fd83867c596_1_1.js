function pan(movementX) {
    var currentPage = pages.current;

    pageHelper.getCurrent().moveTo(movementX + 'px');

    if (currentPage > 0) {
      pageHelper.getPrevious().moveTo('-100% + ' + movementX + 'px');
    }

    if (currentPage < pages.total - 1) {
      pageHelper.getNext().moveTo('100% + ' + movementX + 'px');
    }
  }