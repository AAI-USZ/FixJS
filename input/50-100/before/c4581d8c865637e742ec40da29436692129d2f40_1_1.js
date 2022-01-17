function(firstUsedIndex, lastUsedIndex) {
    this.pendingRequestCount++;

    // We send indices and suid's.  The indices are used for fast-pathing;
    // if the suid's don't match, a linear search is undertaken.
    this._api.__bridgeSend({
        type: 'shrinkSlice',
        firstIndex: firstUsedIndex,
        firstSuid: this.items[firstUsedIndex].id,
        lastIndex: lastUsedIndex,
        lastSuid: this.items[lastUsedIndex].id,
        handle: this._handle
      });
  }