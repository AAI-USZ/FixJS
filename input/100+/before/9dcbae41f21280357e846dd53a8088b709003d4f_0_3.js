function(src, j) {
  var c, img, render, replay, tpf, x;
  c = document.getElementById('playback');
  x = c.getContext('2d');
  img = new Image();
  img.src = src;
  tpf = 500;
  render = function(frame, image) {
    return x.drawImage(image, frame.sX, frame.sY, frame.w, frame.h, frame.bX, frame.bY, frame.w, frame.h);
  };
  replay = function() {
    var frame, _fn, _i, _len;
    c.width = j[0].w;
    c.height = j[0].h;
    _fn = function(frame, img) {
      return setTimeout(function() {
        return render(frame, img);
      }, frame.f * tpf);
    };
    for (_i = 0, _len = j.length; _i < _len; _i++) {
      frame = j[_i];
      _fn(frame, img);
    }
    return setTimeout(function() {
      return replay();
    }, (j[j.length - 1].f + 1) * tpf);
  };
  return img.onload = replay;
}