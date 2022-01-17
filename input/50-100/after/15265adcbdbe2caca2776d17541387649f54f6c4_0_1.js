function(oldIndex, oldPage) {
        if (oldPage && oldPage !== page) {
          oldPage.index = pages.length;
          pages.push(oldPage);
        } else {
          removed = true;
        }
        if (currentPage && page === oldPage && page === currentPage) {
          if (pages.length) {
            newCurrentPage = pages[pages.length - 1];
          } else {
            newCurrentPage = folio.pages[oldIndex + 1];
          }
        }
      }