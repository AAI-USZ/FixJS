function ifs__startSync(slice, startTS, endTS) {
    if (startTS === null)
      startTS = endTS - (INITIAL_SYNC_DAYS * DAY_MILLIS);
    slice.setStatus('synchronizing', false, true);
    slice.waitingOnData = 'sync';
    this._curSyncSlice = slice;
    this._curSyncStartTS = startTS;
    this._curSyncDayStep = INITIAL_SYNC_DAYS;
    this._curSyncDoNotGrowWindowBefore = null;
    this.folderConn.syncDateRange(startTS, endTS, true,
                                  this.onSyncCompleted.bind(this));
  }