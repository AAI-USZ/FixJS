function goPrev(transEndCallbck) {
    var prevPage = pageHelper.getPrevious();
    var curPage = pageHelper.getCurrent();
    curPage.moveToEnd();
    prevPage.moveToCenter(transEndCallbck);
    pages.current--;
    updatePaginationBar();
  }