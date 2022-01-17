function(pos, length, callback) {
      var op;
      op = [
        {
          p: pos,
          d: this.snapshot.slice(pos, (pos + length))
        }
      ];
      this.submitOp(op, callback);
      return op;
    }