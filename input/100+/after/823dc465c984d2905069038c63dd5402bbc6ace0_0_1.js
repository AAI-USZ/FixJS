function(key) {
    var sprite_x = ALPHA[key][0],
        width = ALPHA[key][1];
        img = SPRITE.getImageData(sprite_x, 0, width, 16);
    SCRATCH.putImageData(img, cursor, 0);
    cursor += width;
  }