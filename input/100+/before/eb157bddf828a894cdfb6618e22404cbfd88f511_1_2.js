function(dest, proj) {
    var body, page, _i, _len, _ref, _results;
    this.proj = proj;
    console.log(pages);
    _results = [];
    for (_i = 0, _len = pages.length; _i < _len; _i++) {
      page = pages[_i];
      _ref = ("/" + page).split('.'), this.pathname = _ref[0], this.ext = _ref[1];
      body = this.ext != null ? this.render() : 'DIR';
      _results.push(this.build(body, page, dest));
    }
    return _results;
  }