function(pos, text, callback) {
      var docPos, op;
      if (pos === void 0) pos = 0;
      op = [];
      docPos = {
        index: 0,
        offset: 0
      };
      appendSkipChars(op, this.snapshot, docPos, pos);
      append(op, {
        'i': text
      });
      appendSkipChars(op, this.snapshot, docPos);
      this.submitOp(op, callback);
      return op;
    }