function() {
  var block, canvas, coords, ctx, fit, frame, h, image, index, isSubset, msort, offsetX, offsetY, pack, preview, reduced, sorts, subsets, w, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2, _ref3;
  msort = function(a, b, criteria) {
    var criterion, diff, _i, _len;
    for (_i = 0, _len = criteria.length; _i < _len; _i++) {
      criterion = criteria[_i];
      diff = sorts[criterion](a, b);
      if (diff !== 0) {
        return diff;
      }
    }
    return 0;
  };
  sorts = {
    random: function(a, b) {
      return Math.random() - 0.5;
    },
    w: function(a, b) {
      return b.w - a.w;
    },
    h: function(a, b) {
      return b.h - a.h;
    },
    a: function(a, b) {
      return b.area - a.area;
    },
    max: function(a, b) {
      return Math.max(b.w, b.h) - Math.max(a.w, a.h);
    },
    min: function(a, b) {
      return Math.min(b.w, b.h) - Math.min(a.w, a.h);
    },
    height: function(a, b) {
      return msort(a, b, ['h', 'w']);
    },
    width: function(a, b) {
      return msort(a, b, ['w', 'h']);
    },
    area: function(a, b) {
      return msort(a, b, ['a', 'h', 'w']);
    },
    maxside: function(a, b) {
      return msort(a, b, ['max', 'min', 'h', 'w']);
    }
  };
  blocks = blocks.sort(sorts.area);
  pack = new Packer;
  console.log("Fitting boxes together");
  reduced = (function() {
    var _i, _len, _results;
    _results = [];
    for (_i = 0, _len = blocks.length; _i < _len; _i++) {
      block = blocks[_i];
      if (!block.isSubset) {
        _results.push(block);
      }
    }
    return _results;
  })();
  blocks = pack.fit(reduced);
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = pack.root.w;
  canvas.height = pack.root.h;
  ctx.fillStyle = '#007fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  index = [];
  for (_i = 0, _len = blocks.length; _i < _len; _i++) {
    _ref = blocks[_i], frame = _ref.frame, image = _ref.image, offsetX = _ref.offsetX, offsetY = _ref.offsetY, w = _ref.w, h = _ref.h, fit = _ref.fit, subsets = _ref.subsets, isSubset = _ref.isSubset;
    w = Math.min(w, image.width - offsetX);
    h = Math.min(h, image.height - offsetY);
    ctx.drawImage(image, offsetX, offsetY, w, h, fit.x, fit.y, w, h);
    if (!isSubset) {
      index.push({
        f: frame,
        sX: fit.x,
        sY: fit.y,
        bX: offsetX,
        bY: offsetY,
        w: w,
        h: h
      });
    }
    if (subsets) {
      for (_j = 0, _len1 = subsets.length; _j < _len1; _j++) {
        _ref1 = subsets[_j], frame = _ref1.frame, w = _ref1.w, h = _ref1.h, coords = _ref1.coords, offsetX = _ref1.offsetX, offsetY = _ref1.offsetY;
        index.push({
          f: frame,
          sX: fit.x + coords[0],
          sY: fit.y + coords[1],
          bX: offsetX,
          bY: offsetY,
          w: w,
          h: h
        });
      }
    }
  }
  preview = document.getElementById('preview');
  _ref2 = [canvas.width, canvas.height], preview.width = _ref2[0], preview.height = _ref2[1];
  preview = preview.getContext('2d');
  preview.drawImage(canvas, 0, 0);
  document.getElementById('save').href = canvas.toDataURL('image/png');
  preview.strokeStyle = 'green';
  for (_k = 0, _len2 = blocks.length; _k < _len2; _k++) {
    _ref3 = blocks[_k], frame = _ref3.frame, image = _ref3.image, offsetX = _ref3.offsetX, offsetY = _ref3.offsetY, w = _ref3.w, h = _ref3.h, fit = _ref3.fit, subsets = _ref3.subsets;
    preview.strokeRect(fit.x, fit.y, w, h);
    preview.fillText('(' + offsetX + ',' + offsetY + ')', fit.x, fit.y);
  }
  index = index.sort(function(a, b) {
    return a.f - b.f;
  });
  console.log(index);
  console.log(JSON.stringify(index));
  console.log(denseIndex(index, [canvas.width, canvas.height]));
  return player(canvas.toDataURL('image/png'), index);
}