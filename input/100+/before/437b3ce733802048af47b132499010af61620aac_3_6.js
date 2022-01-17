function ifs_sliceOpenFromNow(slice, daysDesired) {
    daysDesired = daysDesired || INITIAL_SYNC_DAYS;
    this._slices.push(slice);
    if (this._curSyncSlice) {
      console.error("Trying to open a slice and initiate a sync when there",
                    "is already an active sync slice!");
    }
    slice.atTop = true;

    // -- Check if we have sufficiently useful data on hand.

    var now = TIME_WARPED_NOW || Date.now(),
        futureNow = FUTURE_TIME_WARPED_NOW || null,
        pastDate = makeDaysAgo(daysDesired),
        iAcc, iHeadBlock, ainfo,
        // What is the startTS fullSync data we have for the time range?
        worstGoodData = 0;

    for (iAcc = 0; iAcc < this._accuracyRanges.length; iAcc++) {
      ainfo = this._accuracyRanges[iAcc];
      if (BEFORE(pastDate, ainfo.endTS))
        break;
      if (!ainfo.fullSync)
        break;
      if (worstGoodData)
        worstGoodData = Math.min(ainfo.fullSync.updated, worstGoodData);
      else
        worstGoodData = ainfo.fullSync.updated;
    }
    var existingDataGood;
    if (!this._account.universe.online)
      existingDataGood = true;
    else // TODO: consider just filling from the db if recent enough
      //existingDataGood = (worstGoodData + RECENT_ENOUGH_TIME_THRESH > now);
      existingDataGood = false;

    // -- Good existing data, fill the slice from the DB
    if (existingDataGood) {
      // We can adjust our start time to the dawn of time since we have a
      // limit in effect.
      slice.waitingOnData = 'db';
      this.getMessagesInImapDateRange(0, futureNow,
                                      INITIAL_FILL_SIZE, INITIAL_FILL_SIZE,
                                      this.onFetchDBHeaders.bind(this, slice));
      return;
    }

    // -- Bad existing data, issue a sync and have the slice
    this._startSync(slice, pastDate, futureNow);
  }