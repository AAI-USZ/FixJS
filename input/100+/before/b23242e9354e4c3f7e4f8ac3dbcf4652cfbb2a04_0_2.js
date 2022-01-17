function characterSheet(imageURL, x, y, width, height) {
  imageURL = imageURL;
  x = (x == undefined)? 0 : x;
  y = (y == undefined)? 0 : y;
  width = (width == undefined)? 64 : width;
  height = (height == undefined)? 128 : height;

  north_anim = new Animation([
    new Sprite({
      imageURL: imageURL,
      x: x,
      y: y,
      width: width/2,
      height: height/4,
      xoffset: -8,
      yoffset: -16,
      trackxoffset: 0,
      trackyoffset: 0,
      duration: 100
    }),
    new Sprite({
      imageURL: imageURL,
      x: x,
      y: y + (height/4),
      width: width/2,
      height: height/4,
      xoffset: -8,
      yoffset: -20,
      trackxoffset: 0,
      trackyoffset: 4,
      duration: 100
    }),
    new Sprite({
      imageURL: imageURL,
      x: x,
      y: y,
      width: width/2,
      height: height/4,
      xoffset: -8,
      yoffset: -24,
      trackxoffset: 0,
      trackyoffset: 8,
      duration: 100
    }),
    new Sprite({
      imageURL: imageURL,
      x: x,
      y: y + (height/4),
      width: width/2,
      height: height/4,
      xoffset: -8,
      yoffset: -28,
      trackxoffset: 0,
      trackyoffset: 12,
      duration: 100
    }),
  ]);

  south_anim = new Animation([
    new Sprite({
      imageURL: imageURL,
      x: x,
      y: y + (height/4)*2,
      width: width/2,
      height: height/4,
      xoffset: -8,
      yoffset: -16,
      trackxoffset: 0,
      trackyoffset: 0,
      duration: 100
    }),
    new Sprite({
      imageURL: imageURL,
      x: x,
      y: y + (height/4)*2 + (height/4),
      width: width/2,
      height: height/4,
      xoffset: -8,
      yoffset: -12,
      trackxoffset: 0,
      trackyoffset: -4,
      duration: 100
    }),
    new Sprite({
      imageURL: imageURL,
      x: x,
      y: y + (height/4)*2,
      width: width/2,
      height: height/4,
      xoffset: -8,
      yoffset: -8,
      trackxoffset: 0,
      trackyoffset: -8,
      duration: 100
    }),
    new Sprite({
      imageURL: imageURL,
      x: x,
      y: y + (height/4)*2 + (height/4),
      width: width/2,
      height: height/4,
      xoffset: -8,
      yoffset: -4,
      trackxoffset: 0,
      trackyoffset: -12,
      duration: 100
    }),
  ]);

  east_anim = new Animation([
    new Sprite({
      imageURL: imageURL,
      x: x + (width/2),
      y: y + (height/4)*2,
      width: width/2,
      height: height/4,
      xoffset: -8,
      yoffset: -16,
      trackxoffset: 0,
      trackyoffset: 0,
      duration: 100
    }),
    new Sprite({
      imageURL: imageURL,
      x: x + (width/2),
      y: y + (height/4)*2 + (height/4),
      width: width/2,
      height: height/4,
      xoffset: -4,
      yoffset: -16,
      trackxoffset: -4,
      trackyoffset: 0,
      duration: 100
    }),
    new Sprite({
      imageURL: imageURL,
      x: x + (width/2),
      y: y + (height/4)*2,
      width: width/2,
      height: height/4,
      xoffset: 4,
      yoffset: -16,
      trackxoffset: -12,
      trackyoffset: 0,
      duration: 100
    }),
    new Sprite({
      imageURL: imageURL,
      x: x + (width/2),
      y: y + (height/4)*2 + (height/4),
      width: width/2,
      height: height/4,
      xoffset: 4,
      yoffset: -16,
      trackxoffset: -12,
      trackyoffset: 0,
      duration: 100
    }),
  ]);

  west_anim = new Animation([
    new Sprite({
      imageURL: imageURL,
      x: x + (width/2),
      y: y,
      width: width/2,
      height: height/4,
      xoffset: -8,
      yoffset: -16,
      trackxoffset: 0,
      trackyoffset: 0,
      duration: 100
    }),
    new Sprite({
      imageURL: imageURL,
      x: x + (width/2),
      y: y + (height/4),
      width: width/2,
      height: height/4,
      xoffset: -12,
      yoffset: -16,
      trackxoffset: 4,
      trackyoffset: 0,
      duration: 100
    }),
    new Sprite({
      imageURL: imageURL,
      x: x + (width/2),
      y: y,
      width: width/2,
      height: height/4,
      xoffset: -16,
      yoffset: -16,
      trackxoffset: 8,
      trackyoffset: 0,
      duration: 100
    }),
    new Sprite({
      imageURL: imageURL,
      x: x + (width/2),
      y: y + (height/4),
      width: width/2,
      height: height/4,
      xoffset: -20,
      yoffset: -16,
      trackxoffset: 12,
      trackyoffset: 0,
      duration: 100
    }),
  ]);
  return [north_anim,south_anim,east_anim,west_anim];
}