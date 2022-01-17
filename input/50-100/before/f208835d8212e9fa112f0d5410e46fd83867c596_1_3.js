function checkEmptyPages() {
    var index = 0;
    var total = pages.total;

    while (index < total) {
      var page = pages.list[index];
      if (page.getNumApps() === 0) {
        pageHelper.remove(index);
        break;
      }
      index++;
    }
  }