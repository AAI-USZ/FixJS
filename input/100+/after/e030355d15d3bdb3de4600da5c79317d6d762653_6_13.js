function(op, callback) {
      if (this.type.normalize != null) {
        op = this.type.normalize(op);
      }
      this.snapshot = this.type.apply(this.snapshot, op);
      if (this.pendingOp !== null) {
        this.pendingOp = this.type.compose(this.pendingOp, op);
      } else {
        this.pendingOp = op;
      }
      if (callback) {
        this.pendingCallbacks.push(callback);
      }
      this.emit('change', op);
      return setTimeout(this.flush, 0);
    }