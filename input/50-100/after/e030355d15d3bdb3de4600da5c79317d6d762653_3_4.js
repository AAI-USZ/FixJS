function(path, length, pos, cb) {
      var elem, key, op, _ref;
      _ref = traverse(this.snapshot, path), elem = _ref.elem, key = _ref.key;
      op = [
        {
          p: path.concat(pos),
          sd: elem[key].slice(pos, pos + length)
        }
      ];
      return this.submitOp(op, cb);
    }