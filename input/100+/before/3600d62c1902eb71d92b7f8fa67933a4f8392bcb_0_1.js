function(firstIndex, firstSuid, lastIndex, lastSuid) {
    var i;
    // - Fixup indices if required
    if (firstIndex >= this.headers.length ||
        this.headers[firstIndex].suid !== firstSuid) {
      firstIndex = 0; // default to not splicing if it's gone
      for (i = 0; i < this.headers.length; i++) {
        if (this.headers[i].suid === firstSuid) {
          firstIndex = i;
          break;
        }
      }
    }
    if (lastIndex >= this.headers.length ||
        this.headers[lastIndex].suid !== lastSuid) {
      for (i = this.headers.length - 1; i >= 0; i--) {
        if (this.headers[i].suid === lastSuid) {
          lastIndex = i;
          break;
        }
      }
    }

    // - Perform splices as required
    // (high before low to avoid index changes)
    if (lastIndex + 1 < this.headers.length) {
      this.atBottom = false;
      this.userCanGrowDownwards = false;
      this._bridgeHandle.sendSplice(
        lastIndex + 1, this.headers.length - lastIndex  - 1, [],
        // This is expected; more coming if there's a low-end splice
        true, firstIndex > 0);
      this.headers.splice(lastIndex + 1, this.headers.length - lastIndex - 1);
      var lastHeader = this.headers[lastIndex];
      this.startTS = lastHeader.date;
      this.startUID = lastHeader.id;
    }
    if (firstIndex > 0) {
      this.atTop = false;
      this._bridgeHandle.sendSplice(
        0, firstIndex, [], true, false);
      this.headers.splice(0, firstIndex);
      var firstHeader = this.headers[0];
      this.endTS = firstHeader.date;
      this.endUID = firstHeader.id;
    }
  }