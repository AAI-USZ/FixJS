function(elem, title, index) {
      elem = $(elem);
      if (title == null) var title = elem.attr(titleAttrName);
      var page = {elem: elem, title: title, index: index};
      if (typeof index === 'undefined') {
        var length = this.pages.push(page);
        page.index = length - 1;
      } else {
        var before = this.pages.slice(0, index);
        var after = this.pages.slice(index);
        var pages = before.concat([page], after);
        $.each(pages, function(i, p) {
          p.index = i;
        });
        this.pages = pages;
      }
      this.$el.trigger('folioPagesChanged', this);
      return page;
    }