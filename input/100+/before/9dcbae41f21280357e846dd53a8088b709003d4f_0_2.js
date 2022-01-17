function() {
  var block, canvas, color, coords, ctx, fit, frame, h, image, index, isSubset, msort, offsetX, offsetY, pack, preview, reduced, sorts, subsets, vanity, vx, w, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
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
  blockDeduplication(blocks);
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
  _ref = ['#007fff', '#c0ffee', '#f1eece', '#efface', '#babb1e'];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    color = _ref[_i];
    vanity = document.createElement('canvas');
    _ref1 = [10, 10], vanity.width = _ref1[0], vanity.height = _ref1[1];
    vx = vanity.getContext('2d');
    vx.fillStyle = color;
    vx.fillRect(0, 0, vanity.width, vanity.height);
    reduced.push({
      image: vanity,
      offsetX: 0,
      offsetY: 0,
      w: vanity.width,
      h: vanity.height,
      isSubset: true
    });
  }
  blocks = pack.fit(reduced);
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = pack.root.w;
  canvas.height = pack.root.h;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  index = [];
  for (_j = 0, _len1 = blocks.length; _j < _len1; _j++) {
    _ref2 = blocks[_j], frame = _ref2.frame, image = _ref2.image, offsetX = _ref2.offsetX, offsetY = _ref2.offsetY, w = _ref2.w, h = _ref2.h, fit = _ref2.fit, subsets = _ref2.subsets, isSubset = _ref2.isSubset;
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
      for (_k = 0, _len2 = subsets.length; _k < _len2; _k++) {
        _ref3 = subsets[_k], frame = _ref3.frame, w = _ref3.w, h = _ref3.h, coords = _ref3.coords, offsetX = _ref3.offsetX, offsetY = _ref3.offsetY;
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
  _ref4 = [canvas.width, canvas.height], preview.width = _ref4[0], preview.height = _ref4[1];
  preview = preview.getContext('2d');
  preview.drawImage(canvas, 0, 0);
  document.getElementById('save').href = canvas.toDataURL('image/png');
  for (_l = 0, _len3 = blocks.length; _l < _len3; _l++) {
    _ref5 = blocks[_l], frame = _ref5.frame, image = _ref5.image, offsetX = _ref5.offsetX, offsetY = _ref5.offsetY, w = _ref5.w, h = _ref5.h, fit = _ref5.fit, subsets = _ref5.subsets;
    preview.strokeRect(fit.x, fit.y, w, h);
  }
  index = index.sort(function(a, b) {
    return a.f - b.f;
  });
  console.log(index);
  console.log(JSON.stringify(index));
  return player(canvas.toDataURL('image/png'), index);
}