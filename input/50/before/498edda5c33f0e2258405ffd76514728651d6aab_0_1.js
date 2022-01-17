function(e) {
      e.preventDefault();
      pager.setPageWithAnimation(pager.pagesById['time']);
      scrollTo($opportunities);
    }