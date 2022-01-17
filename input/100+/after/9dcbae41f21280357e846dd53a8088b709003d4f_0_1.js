function(hx, hy) {
    var x, y, _i, _j, _ref, _ref1;
    for (y = _i = 1, _ref = needle.height; 1 <= _ref ? _i < _ref : _i > _ref; y = 1 <= _ref ? ++_i : --_i) {
      for (x = _j = 0, _ref1 = needle.width; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; x = 0 <= _ref1 ? ++_j : --_j) {
        if (!pixc(hpix(hx + x, hy + y), npix(x, y))) {
          return;
        }
      }
    }
    return true;
  }