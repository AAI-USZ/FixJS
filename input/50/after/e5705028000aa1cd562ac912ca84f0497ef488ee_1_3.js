function(options) {
    options = options || {};
    var fragment = '';

    if(options.fragment) {
      fragment += '#' + this.escape(options.fragment);
    }

    return fragment;
  }