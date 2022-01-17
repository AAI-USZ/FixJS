function pan(movementX) {
    var currentPage = pages.current;
    var move = movementX + 'px';

    pageHelper.getCurrent().moveTo(move);

    if (currentPage > 0) {
      pageHelper.getPrevious().moveTo(dirCtrl.offsetPrev + ' + ' + move);
    }

    if (currentPage < pages.total - 1) {
      pageHelper.getNext().moveTo(dirCtrl.offsetNext + ' + ' + move);
    }
  }