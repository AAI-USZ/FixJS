function ifs_refreshSlice(slice) {
    var startTS = slice.startTS, endTS = slice.endTS, self = this;

    // - Grow endTS
    // If the endTS lines up with the most recent know message for the folder,
    // then remove the timestamp constraint so it goes all the way to now.
    // OR if we just have no known messages
    if (this.headerIsYoungestKnown(endTS, slice.endUID)) {
console.log("growing endTS from", endTS, "to nowish");
      endTS = FUTURE_TIME_WARPED_NOW || null;
    }
    else {
      // We want the range to include the day; since it's an exclusive range
      // quantized to midnight, we need to adjust forward a day and then
      // quantize.
      endTS = quantizeDate(endTS - DAY_MILLIS);
    }

    // - Grow startTS
    // Grow the start-stamp to include the oldest continuous accuracy range
    // coverage date.
    if (this.headerIsOldestKnown(startTS, slice.startUID)) {
      var syncStartTS = this.getOldestFullSyncDate(startTS);
if (syncStartTS !== startTS)
console.log("growing startTS to", syncStartTS, "from", startTS);
      startTS = syncStartTS;
    }

    // XXX use mutex scheduling to avoid this possibly happening...
    if (this._curSyncSlice)
      throw new Error("Can't refresh a slice when there is an existing sync");
    this._curSyncAccuracyStamp = Date.now();
    this.folderConn.syncDateRange(startTS, endTS, true, function() {
      self._account.__checkpointSyncCompleted();
      slice.setStatus('synced', true, false);
    });
  }