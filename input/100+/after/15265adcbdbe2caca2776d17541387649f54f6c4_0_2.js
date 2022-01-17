function(elem, params) {
    var currentPage;
    this.$el = elem;
    var titleAttrName = 'data-page-title';

    //## Scan For Page Elements
    //
    // Search the widget element for children with class "page".  These
    // elements are collected to make the folio pages.  This method resets any
    // existing pages. If pages are found the current page is set to the first
    // page. The current page is returned.
    this.findPages = function() {
      var folio = this;
      folio.pages = [];
      // Only direct children of the folio widget are considered
      // This prevents strange nesting of pages
      var pageElems = this.$el.find('>.page');
      if (pageElems) $.each(pageElems, function(i, elem) {
        folio.pages.push({
          index: i,
          elem: elem,
          title: elem.attr(titleAttrName) || 'Page ' + (i + 1),
        });
      });
      if (folio.pages.length) {
        return folio.currentPage(0);
      }
    }

    //## Get or Set the Current Page
    //
    // If called with no argument, return the current page object, which
    // has the attributes *index*, *elem*, and *title*. Note the current
    // page may be undefined if the widget contains no pages.
    //
    // If called with an integer index, or page title, the current page
    // is set to the matching page. In the case of duplicate titles,
    // the first matching page is selected. If no page matches, the
    // current page is unchanged.
    //
    // Return the current page.
    this.currentPage = function(whichPage) {
      var page;
      // `currentPage()` *(getter)*
      if (typeof whichPage === 'undefined') {
        return currentPage;
      // `currentPage('title')` *(setter)*
      } else if (typeof whichPage === 'string') {
        for (var i = 0; (page = this.pages[i]); i++) {
          if (whichPage === page.title) break;
        }
      // `currentPage(#)` *(setter)*
      } else if (typeof whichPage === 'number') {
        page = this.pages[whichPage];
      }
      if (page) {
        if (currentPage) {
          currentPage.elem.removeClass('folio-current-page');
        }
        currentPage = page;
        page.elem.addClass('folio-current-page');
        page.elem.trigger('folioCurrentPage', this);
      }
      return currentPage;
    }

    //## Go To Next Page
    //
    // Set the current page to the next page in sequence.
    // Return the current page object.
    this.nextPage = function() {
      if (currentPage) return this.currentPage(currentPage.index + 1);
    }

    //## Go To Previous Page
    //
    // Set the current page to the previous page in sequence.
    // Return the current page object.
    this.previousPage = function() {
      if (currentPage) return this.currentPage(currentPage.index - 1);
    }

    //## Add a Page
    //
    // **elem** The element containing the page content. 
    // This can be specified as a DOM element, or selector string.
    // This element should generally be a child of the widget element.
    //
    // **title** The page title. If not specified it will be derived from
    // the element attr `data-page-title`.
    //
    // **index** The index where the page will be inserted. If omitted,
    // the page is appended to the end of the list.
    //
    // Return the page object.
    this.addPage = function(elem, title, index) {
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

    //## Remove a Page
    //
    // **index** The integer page index to remove from the folio. If this is
    // the current page, the current page will be changed to an adjacent page
    // if possible.
    //
    // Return `true` if a page was removed.
    this.removePage = function(index) {
      var newCurrentPage,
          folio = this,
          page = this.pages[index],
          removed = false,
          pages = [];
      $.each(this.pages, function(oldIndex, oldPage) {
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
      });
      if (removed) {
        this.pages = pages;
        this.$el.trigger('folioPagesChanged', this);
        if (newCurrentPage) this.currentPage(newCurrentPage.index);
        if (pages.length === 0) {
          if (currentPage) currentPage.elem.removeClass('folio-current-page');
          currentPage = undefined;
          page.elem.trigger('folioCurrentPage', this);
        }
      }
      return removed;
    }

    this.findPages();
  }