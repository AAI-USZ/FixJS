function etch(str) {
  var cursor = 0;
  str = str.toLowerCase();
  var etch_char = function(key) {
    var sprite_x = ALPHA[key][0],
        width = ALPHA[key][1];
        img = SPRITE.getImageData(sprite_x, 0, width, 16);
    SCRATCH.putImageData(img, cursor, 0);
    cursor += width;
  }

  etch_char("start");
  for (var i = 0; i < str.length; i++) {
    etch_char(str.charAt(i));
  }
  etch_char("end");

  CACHE[str] = SCRATCH.getImageData(0, 0, cursor, 16); 
}