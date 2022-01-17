function(page) {
      var index, newCurrentPage;
      if (typeof page === 'number') {
        index = page;
        page = this.pages[index];
      } else {
        for (index = 0; index < this.pages.length; index++) {
          if (page === this.pages[index]) {
            break;
          }
        }
      }
      if (page === this.pages[index]) {
        var pages = [];
        $.each(this.pages, function(oldIndex, oldPage) {
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
        });
        this.pages = pages;
        this.$el.trigger('folioPagesChanged', this);
        if (page === currentPage) {
          this.currentPage(newCurrentPage.index);
        }
      }
    }