function goNext(transEndCallbck) {
    var nextPage = pageHelper.getNext();
    var curPage = pageHelper.getCurrent();
    curPage.moveToLeft();
    nextPage.moveToCenter(transEndCallbck);
    pages.current++;
    updatePaginationBar();
  }