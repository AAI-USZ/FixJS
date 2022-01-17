function checkIsOverflow(page, index) {
      // ignore the search page
      if (index === 0) {
        return;
      }

      // if the page is not full
      if (page.getNumApps() <= max) {
        return;
      }

      var propagateIco = page.popIcon();
      if (index === pageHelper.total() - 1) {
        pageHelper.push([propagateIco]); // new page
      } else {
        pages[index + 1].prependIcon(propagateIco); // next page
      }
    }