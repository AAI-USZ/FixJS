function goNext(transEndCallbck) {
    var nextPage = pageHelper.getNext();
    var curPage = pageHelper.getCurrent();
    curPage.moveToBegin();
    nextPage.moveToCenter(transEndCallbck);
    pages.current++;
    updatePaginationBar();
  }