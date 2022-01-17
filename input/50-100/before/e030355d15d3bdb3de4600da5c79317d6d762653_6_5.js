function(docOp, isRemote) {
      var oldSnapshot;
      oldSnapshot = this.snapshot;
      this.snapshot = this.type.apply(this.snapshot, docOp);
      this.emit('change', docOp, oldSnapshot);
      if (isRemote) return this.emit('remoteop', docOp, oldSnapshot);
    }