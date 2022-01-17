function Page(pathname) {
    var index, page, _i, _len;
    this.pathname = pathname != null ? pathname : '';
    if (this.pathname !== '') {
      for (index = _i = 0, _len = pages.length; _i < _len; index = ++_i) {
        page = pages[index];
        if ('/' + (page != null ? page.split('.')[0] : void 0) === pathname) {
          this.ext = page.split('.')[1];
        }
      }
    }
  }