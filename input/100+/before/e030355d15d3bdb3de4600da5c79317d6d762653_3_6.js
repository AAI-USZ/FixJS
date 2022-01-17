function(path, value, cb) {
      var elem, key, op, _ref;
      _ref = traverse(this.snapshot, path), elem = _ref.elem, key = _ref.key;
      op = {
        p: path
      };
      if (elem.constructor === Array) {
        op.li = value;
        if (typeof elem[key] !== 'undefined') op.ld = elem[key];
      } else if (typeof elem === 'object') {
        op.oi = value;
        if (typeof elem[key] !== 'undefined') op.od = elem[key];
      } else {
        throw new Error('bad path');
      }
      return this.submitOp([op], cb);
    }