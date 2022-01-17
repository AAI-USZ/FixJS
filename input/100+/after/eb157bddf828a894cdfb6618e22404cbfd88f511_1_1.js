function Page(pathname) {
    var index, page, _i, _len, _ref;
    this.pathname = pathname != null ? pathname : '';
    this.pages = wrench.readdirSyncRecursive('pages');
    if (this.pathname !== '') {
      _ref = this.pages;
      for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
        page = _ref[index];
        if ('/' + (page != null ? page.split('.')[0] : void 0) === pathname) {
          this.ext = page.split('.')[1];
        }
      }
    }
  }