function ifs_addMessageHeader(header) {
    var self = this;

    if (this._pendingLoads.length) {
      this._deferredCalls.push(this.addMessageHeader.bind(this, header));
      return;
    }

    if (self._curSyncSlice)
      self._curSyncSlice.onHeaderAdded(header);

    this._insertIntoBlockUsingDateAndUID(
      'header', header.date, header.id, HEADER_EST_SIZE_IN_BYTES,
      header, null);
  }