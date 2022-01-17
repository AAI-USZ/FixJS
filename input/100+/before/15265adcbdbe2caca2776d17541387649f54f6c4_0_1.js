function(elem, title, index) {
      elem = $(elem);
      if (title == null) var title = elem.attr(titleAttrName);
      var page = {elem: elem, title: title, index: index};
      var length = this.pages.push(page);
      if (typeof index === 'undefined') {
        page.index = length - 1;
      } else {
        this.pages.sort(function(a, b) {
          return a.index - b.index;
        });
      }
      elem.trigger('folioPagesChanged', this);
      return page;
    }