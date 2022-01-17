function(o){
    var that, i, index, op, left, lefts, rites, node, __ref, __len, __len1, __ref1;
    if (that = this.head.unfoldAssign(o)) {
      (__ref = that.right.tails).push.apply(__ref, this.tails);
      return that;
    }
    for (i = 0, __len = (__ref = this.tails).length; i < __len; ++i) {
      index = __ref[i];
      if (op = index.assign) {
        index.assign = '';
        left = Chain(this.head, this.tails.splice(0, i)).expandSlice(o).unwrap();
        if (left instanceof Arr) {
          lefts = left.items;
          rites = (this.head = Arr()).items;
          for (i = 0, __len1 = lefts.length; i < __len1; ++i) {
            node = lefts[i];
            __ref1 = Chain(node).cacheReference(o), rites[i] = __ref1[0], lefts[i] = __ref1[1];
          }
        } else {
          __ref1 = Chain(left).cacheReference(o), left = __ref1[0], this.head = __ref1[1];
        }
        if (op === '=') {
          op = ':=';
        }
        return __ref1 = Assign(left, this, op), __ref1.access = true, __ref1;
      }
    }
  }