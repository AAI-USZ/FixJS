function write(canvas, str, x, y) {
  if (!CACHE[str]) {
    etch(str);
  }
  var image = CACHE[str];
  canvas.putImageData(image, x, y - image.height / 2);
}