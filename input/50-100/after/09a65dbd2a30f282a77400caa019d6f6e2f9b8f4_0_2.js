function() {
    if (this.scroller) {
      this.scroller.refresh();
      console.log(this.scroller, this.snapshot);
      this.scroller.scrollTo(0, this.snapshot.y);

      clearTimeout(this._snapshotTimeout);
      this._snapshotTimeout = setTimeout(dojo.hitch(this, function() {
        this._resetSnapshot();
      }), 1000);
    }
  }