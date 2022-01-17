function getFirstPageWithEmptySpace() {
    var maxPerPage = pageHelper.getMaxPerPage();

    var pagesCount = pageHelper.total();
    for (var i = 1; i < pagesCount; i++) {
      if (pages[i].getNumApps() < maxPerPage) {
        return i;
      }
    }

    // Do we need to create a new page ourself?
    return pagesCount;
  }