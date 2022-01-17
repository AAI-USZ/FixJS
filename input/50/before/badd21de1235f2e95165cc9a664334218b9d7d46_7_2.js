function goPrev(transEndCallbck) {
    var prevPage = pageHelper.getPrevious();
    var curPage = pageHelper.getCurrent();
    curPage.moveToRight();
    prevPage.moveToCenter(transEndCallbck);
    pages.current--;
    updatePaginationBar();
  }