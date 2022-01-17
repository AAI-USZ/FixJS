function(dest, proj) {
    var body, page, _i, _len, _ref, _ref1, _results;
    this.proj = proj;
    console.log(this.pages);
    _ref = this.pages;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      page = _ref[_i];
      _ref1 = ("/" + page).split('.'), this.pathname = _ref1[0], this.ext = _ref1[1];
      body = this.ext != null ? this.render() : 'DIR';
      _results.push(this.build(body, page, dest));
    }
    return _results;
  }