function(x, y) {
    var pix;
    pix = (y * needle.width + x) * 4;
    return [needle.data[pix], needle.data[pix + 1], needle.data[pix + 2]];
  }