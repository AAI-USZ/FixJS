function() {
  var frame;
  frame = f++;
  if (frame >= frames.length) {
    console.log("reached end of video");
    if (blocks.length < 132) {
      postProcessing();
    }
    return;
  }
  return dataURLtoCanvas(frames[frame], function(canvas, image, ctx, pixels) {
    var axis, boxes, c, data, height, i, lastX, newboxes, pix, preview, startX, ts, width, x, x1, x2, y, y1, y2, _i, _j, _k, _l, _len, _len1, _len2, _m, _n, _o, _ref, _ref1, _ref2;
    data = pixels.data, width = pixels.width, height = pixels.height;
    ts = +(new Date);
    c = document.getElementById('preview');
    c.width = width;
    c.height = height;
    preview = c.getContext('2d');
    preview.drawImage(canvas, 0, 0);
    if (frame === 0) {
      console.log("first frame, woot");
      blocks.push({
        frame: frame,
        image: image,
        ctx: ctx,
        w: width,
        h: height,
        offsetX: 0,
        offsetY: 0,
        pixels: pixels
      });
    } else {
      boxes = [];
      for (y = _i = 0; 0 <= height ? _i <= height : _i >= height; y = 0 <= height ? ++_i : --_i) {
        lastX = null;
        startX = null;
        for (x = _j = 0; 0 <= width ? _j <= width : _j >= width; x = 0 <= width ? ++_j : --_j) {
          pix = (y * width + x) * 4;
          if (lastFrame[pix] !== data[pix] || lastFrame[pix + 1] !== data[pix + 1] || lastFrame[pix + 2] !== data[pix + 2]) {
            lastX = x;
            if (startX === null) {
              startX = x;
            }
          }
          if (x - lastX > 20 && startX !== null) {
            boxes.push([startX, y, lastX, y + 1]);
            startX = null;
          }
        }
      }
      newboxes = [];
      for (i = _k = 0; _k < 2; i = ++_k) {
        for (axis = _l = 0; _l < 4; axis = ++_l) {
          while ((newboxes = fastAdjacentMerge(boxes, axis)).length < boxes.length) {
            boxes = newboxes;
          }
        }
      }
      preview.strokeStyle = "green";
      for (_m = 0, _len = boxes.length; _m < _len; _m++) {
        _ref = boxes[_m], x1 = _ref[0], y1 = _ref[1], x2 = _ref[2], y2 = _ref[3];
        preview.strokeRect(x1 + .5, y1 + .5, x2 - x1 + .5, y2 - y1 + .5);
      }
      console.log("Beginning preliminary adjacent box mergining", boxes.length);
      console.log("Exporting the blocks", boxes.length, boxes);
      for (_n = 0, _len1 = boxes.length; _n < _len1; _n++) {
        _ref1 = boxes[_n], x1 = _ref1[0], y1 = _ref1[1], x2 = _ref1[2], y2 = _ref1[3];
        preview.strokeRect(x1, y1, x2 - x1, y2 - y1);
      }
      for (_o = 0, _len2 = boxes.length; _o < _len2; _o++) {
        _ref2 = boxes[_o], x1 = _ref2[0], y1 = _ref2[1], x2 = _ref2[2], y2 = _ref2[3];
        blocks.push({
          frame: frame,
          image: image,
          ctx: ctx,
          w: x2 - x1,
          h: y2 - y1,
          offsetX: x1,
          offsetY: y1,
          pixels: ctx.getImageData(x1, y1, x2 - x1, y2 - y1)
        });
      }
    }
    lastFrame = data;
    return setTimeout(processFrame, 500);
  });
}