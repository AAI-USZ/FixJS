function(needle, haystack) {
  var hpix, npix, nsearch, x, y, _i, _ref;
  if (needle.width > haystack.width) {
    return null;
  }
  if (needle.height > haystack.height) {
    return null;
  }
  hpix = function(x, y) {
    var pix;
    pix = (y * haystack.width + x) * 4;
    return [haystack.data[pix], haystack.data[pix + 1], haystack.data[pix + 2]];
  };
  npix = function(x, y) {
    var pix;
    pix = (y * needle.width + x) * 4;
    return [needle.data[pix], needle.data[pix + 1], needle.data[pix + 2]];
  };
  nsearch = function(x, y, _arg) {
    var b, g, h, i, r, _ref;
    r = _arg[0], g = _arg[1], b = _arg[2];
    while (x < needle.width) {
      _ref = npix(x, y), g = _ref[0], h = _ref[1], i = _ref[2];
      if (g === r && h === g && i === b) {
        return x;
      }
      x++;
    }
    return null;
  };
  for (y = _i = 0, _ref = haystack.height - needle.height; 0 <= _ref ? _i < _ref : _i > _ref; y = 0 <= _ref ? ++_i : --_i) {
    x = 0;
    x = nsearch(x, 0, hpix(0, y));
    if (x === null) {
      continue;
    }
    if (x > haystack.width - needle.width) {
      continue;
    }
    console.log(x);
    return null;
  }
}