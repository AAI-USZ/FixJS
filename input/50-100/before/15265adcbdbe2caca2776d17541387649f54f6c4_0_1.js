function(oldIndex, oldPage) {
          if (oldPage && oldPage !== page) {
            oldPage.index = pages.length;
            pages.push(oldPage);
          } else if (currentPage && page === currentPage) {
            if (pages.length) {
              newCurrentPage = pages[pages.length - 1];
            } else {
              newCurrentPage = this.pages[oldIndex + 1];
            }
          }
        }