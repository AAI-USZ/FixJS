function ifs_onSyncCompleted(messagesSeen) {
    console.log("Sync Completed!", this._curSyncDayStep, "days",
                messagesSeen, "messages synced");

    // If it now appears we know about all the messages in the folder, then we
    // are done syncing and can mark the entire folder as synchronized.  This
    // requires that the number of messages we know about is the same as the
    // number the server most recently told us are in the folder, plus that the
    // slice's oldest know message is the oldest message known to the db,
    // implying that we have fully synchronized the folder during this session.
    //
    // NB: If there are any deleted messages, this logic will not save us
    // because we ignored those messages.  This is made less horrible by issuing
    // a time-date that expands as we go further back in time.
    //
    // (I have considered asking to see deleted messages too and ignoring them;
    // that might be suitable.  We could also just be a jerk and force an
    // expunge.)
    var folderMessageCount = this.folderConn && this.folderConn.box &&
                               this.folderConn.box.messages.total,
        dbCount = this.getKnownMessageCount();
    if (folderMessageCount === dbCount &&
        this.headerIsOldestKnown(this._curSyncSlice.startTS,
                                 this._curSyncSlice.startUID)) {
      // (do not desire more headers)
      this._curSyncSlice.desiredHeaders = this._curSyncSlice.headers.length;
      // expand the accuracy range to cover everybody
      this.markSyncedEntireFolder();
    }

    // - Done if we don't want any more headers.
    // XXX prefetch may need a different success heuristic
    if (this._curSyncSlice.headers.length >=
          this._curSyncSlice.desiredHeaders) {
      console.log("SYNCDONE Enough headers retrieved.",
                  "have", this._curSyncSlice.headers.length,
                  "want", this._curSyncSlice.desiredHeaders,
                  "box knows about", this.folderConn.box.messages.total,
                  "sync date", this._curSyncStartTS,
                  "[oldest defined as", OLDEST_SYNC_DATE, "]");
      this._curSyncSlice.waitingOnData = false;
      this._curSyncSlice.setStatus('synced', true, false);
      this._curSyncSlice = null;

      this._account.__checkpointSyncCompleted();
      return;
    }

    // - Increase our search window size if we aren't finding anything
    // Our goal is that if we are going backwards in time and aren't finding
    // anything, we want to keep expanding our window
    var daysToSearch, lastSyncDaysInPast;
    // If we saw messages, there is no need to increase the window size.  We
    // also should not increase the size if we explicitly shrank the window and
    // left a do-not-expand-until marker.
    if (messagesSeen ||
        (this._curSyncDoNotGrowWindowBefore !== null &&
         SINCE(this._curSyncStartTS, this._curSyncDoNotGrowWindowBefore))) {
      daysToSearch = this._curSyncDayStep;
    }
    else {
      // This may be a fractional value because of DST
      lastSyncDaysInPast = ((TIME_WARPED_NOW || quantizeDate(Date.now())) -
                            this._curSyncStartTS) / DAY_MILLIS;
      daysToSearch = Math.ceil(this._curSyncDayStep * 1.6);

      if (lastSyncDaysInPast < 180) {
        if (daysToSearch > 14)
          daysToSearch = 14;
      }
      else if (lastSyncDaysInPast < 365) {
        if (daysToSearch > 30)
          daysToSearch = 30;
      }
      else if (lastSyncDaysInPast < 730) {
        if (daysToSearch > 60)
          daysToSearch = 60;
      }
      else if (lastSyncDaysInPast < 1095) {
        if (daysToSearch > 90)
          daysToSearch = 90;
      }
      else if (lastSyncDaysInPast < 1825) { // 5 years
        if (daysToSearch > 120)
          daysToSearch = 120;
      }
      else if (lastSyncDaysInPast < 3650) {
        if (daysToSearch > 365)
          daysToSearch = 365;
      }
      else if (daysToSearch > 730) {
        daysToSearch = 730;
      }
      this._curSyncDayStep = daysToSearch;
    }

    // - Move the time range back in time more.
    var startTS = makeDaysBefore(this._curSyncStartTS, daysToSearch),
        endTS = this._curSyncStartTS;
    this._curSyncStartTS = startTS;
    this.folderConn.syncDateRange(startTS, endTS, true,
                                  this.onSyncCompleted.bind(this));
  }