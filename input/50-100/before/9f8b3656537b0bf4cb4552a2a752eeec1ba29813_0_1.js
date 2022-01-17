function getFirstPageWithEmptySpace() {
    var index = 0;
    var total = pageHelper.total();

    var maxPerPage = pageHelper.getMaxPerPage();
    while (index < total) {
      var page = pages[index];
      if (page.getNumApps() < maxPerPage) {
        break;
      }
      index++;
    }

    return index;
  }