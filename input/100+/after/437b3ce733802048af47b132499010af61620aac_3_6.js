function ifs_sliceOpenFromNow(slice, daysDesired) {
    daysDesired = daysDesired || INITIAL_SYNC_DAYS;
    this._slices.push(slice);
    if (this._curSyncSlice) {
      console.error("Trying to open a slice and initiate a sync when there",
                    "is already an active sync slice!");
    }
    // by definition, we must be at the top
    slice.atTop = true;

    // -- Check if we have sufficiently useful data on hand.
    // For checking accuracy ranges, the first accuracy range is authoritative
    // for at least all of what `sliceOpenFromNow` returned last time, so we can
    // just check against it.  (It may have been bisected by subsequent scrolled
    // refreshes, but they will be more recent and thus won't affect the least
    // accurate data, which is what we care about.)
    var now = TIME_WARPED_NOW || Date.now(),
        futureNow = FUTURE_TIME_WARPED_NOW || null,
        pastDate = makeDaysAgo(daysDesired),
        iAcc, iHeadBlock, ainfo,
        // What is the startTS fullSync data we have for the time range?
        worstGoodData = 0,
        existingDataGood = false;

    // If we're offline, there's nothing to look into; use the DB.
    if (!this._account.universe.online) {
      existingDataGood = true;
    }
    else if (this._accuracyRanges.length) {
      ainfo = this._accuracyRanges[0];
      var newestMessage = this.getYoungestMessageTimestamp();
      var refreshThresh;
      if (this.folderMeta.type === 'inbox')
        refreshThresh = SYNC_REFRESH_USABLE_DATA_TIME_THRESH_INBOX;
      else if (ON_OR_BEFORE(newestMessage,
                            now - SYNC_REFRESH_USABLE_DATA_OLD_IS_SAFE_THRESH))
        refreshThresh = SYNC_REFRESH_USABLE_DATA_TIME_THRESH_OLD;
      else
        refreshThresh = SYNC_REFRESH_USABLE_DATA_TIME_THRESH_NON_INBOX;

      // We can do the refresh thing if we have updated more recently than
      // the cutoff threshold.
console.log("FSC", ainfo.fullSync && ainfo.fullSync.updated, now - refreshThresh);
      if (ainfo.fullSync &&
          SINCE(ainfo.fullSync.updated, now - refreshThresh)) {
        existingDataGood = true;
      }
      // Look into using an adjusted date range.
      else {
        var rangeThresh;
        if (this.folderMeta.type === 'inbox')
          rangeThresh = SYNC_USE_KNOWN_DATE_RANGE_TIME_THRESH_INBOX;
        else
          rangeThresh = SYNC_USE_KNOWN_DATE_RANGE_TIME_THRESH_NON_INBOX;

console.log("RTC", ainfo.fullSync && ainfo.fullSync.update, now - rangeThresh);
        if (ainfo.fullSync && SINCE(ainfo.fullSync.updated, now - rangeThresh)){
          // METHOD #2
          // We need to iterate over the headers to figure out the right
          // date to use.  We can't just use the accuracy range because it may
          // have been bisected by the user scrolling into the past and
          // triggering a refresh.
          this.getMessagesBeforeMessage(
            null, null, INITIAL_FILL_SIZE - 1,
            function(headers, moreExpected) {
              if (moreExpected)
                return;
              var header = headers[headers.length - 1];
              pastDate = quantizeDate(header.date);
              this._startSync(slice, pastDate, futureNow);
            }.bind(this));
          return;
        }
      }
    }

    // -- Good existing data, fill the slice from the DB
    if (existingDataGood) {
      // We can adjust our start time to the dawn of time since we have a
      // limit in effect.
      slice.waitingOnData = 'db';
      // METHOD #1
      this.getMessagesInImapDateRange(
        0, futureNow, INITIAL_FILL_SIZE, INITIAL_FILL_SIZE,
        // trigger a refresh if we are online
        this.onFetchDBHeaders.bind(this, slice, this._account.universe.online));
      return;
    }

    // -- Bad existing data, issue a sync and have the slice
    // METHOD #3
    this._startSync(slice, pastDate, futureNow);
  }