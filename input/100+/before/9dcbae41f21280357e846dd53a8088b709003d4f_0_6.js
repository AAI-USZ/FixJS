function(canvas, image, ctx, pixels) {
    var boxes, c, data, height, preview, ts, width, x1, x2, y1, y2, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
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
      boxes = differenceBoxes(width, height, lastFrame, data);
      boxes = iteratedMerge(boxes);
      boxes = (function() {
        var _i, _len, _ref, _results;
        _results = [];
        for (_i = 0, _len = boxes.length; _i < _len; _i++) {
          _ref = boxes[_i], x1 = _ref[0], y1 = _ref[1], x2 = _ref[2], y2 = _ref[3];
          if (x2 - x1 > 0 && y2 - y1 > 0) {
            _results.push([x1, y1, x2, y2]);
          }
        }
        return _results;
      })();
      preview.strokeStyle = "green";
      for (_i = 0, _len = boxes.length; _i < _len; _i++) {
        _ref = boxes[_i], x1 = _ref[0], y1 = _ref[1], x2 = _ref[2], y2 = _ref[3];
        preview.strokeRect(x1 + .5, y1 + .5, x2 - x1 + .5, y2 - y1 + .5);
      }
      console.log("Beginning preliminary adjacent box mergining", boxes.length);
      console.log("Exporting the blocks", boxes.length, boxes);
      for (_j = 0, _len1 = boxes.length; _j < _len1; _j++) {
        _ref1 = boxes[_j], x1 = _ref1[0], y1 = _ref1[1], x2 = _ref1[2], y2 = _ref1[3];
        preview.strokeRect(x1, y1, x2 - x1, y2 - y1);
      }
      for (_k = 0, _len2 = boxes.length; _k < _len2; _k++) {
        _ref2 = boxes[_k], x1 = _ref2[0], y1 = _ref2[1], x2 = _ref2[2], y2 = _ref2[3];
        blocks.push({
          frame: frame,
          image: image,
          ctx: ctx,
          w: x2 - x1 + 1,
          h: y2 - y1 + 1,
          offsetX: x1,
          offsetY: y1,
          pixels: ctx.getImageData(x1, y1, x2 - x1 + 1, y2 - y1 + 1)
        });
      }
    }
    lastFrame = data;
    return setTimeout(processFrame, 50);
  }