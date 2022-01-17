function ifs_growSlice(slice, dirMagnitude, userRequestsGrowth) {
    var dir, desiredCount;
    if (dirMagnitude < 0) {
      dir = -1;
      desiredCount = -dirMagnitude;

      // Request 'desiredCount' messages, provide them in a batch.
      this.getMessagesAfterMessage(
        slice.endTS, slice.endUID, desiredCount,
        function(headers, moreExpected) {
          slice.batchAppendHeaders(headers, 0, moreExpected);
        });
    }
    else {
      dir = 1;
      desiredCount = dirMagnitude;

      // The sync wants to be BEFORE the earliest day (which we are assuming
      // is fully synced based on our day granularity).
      var syncEndTS = quantizeDate(slice.startTS);

      var batchHeaders = [];
      // Process the oldest traversed message
      function gotMessages(headers, moreExpected) {
        batchHeaders = batchHeaders.concat(headers);
        if (!moreExpected) {
          var syncStartTS = null;
          if (batchHeaders.length)
            syncStartTS = batchHeaders[batchHeaders.length - 1].date;

          if (syncStartTS) {
            // We are computing a SINCE value, so quantize (to midnight)
            syncStartTS = quantizeDate(syncStartTS);
            // If we're not syncing at least one day, flag to give up.
            if (syncStartTS === syncEndTS)
              syncStartTS = null;
          }

          // Perform the sync if there is a range.
          if (syncStartTS) {
            this._startSync(slice, syncStartTS, syncEndTS);
          }
          // If there is no sync range (left), but there were messsages, report
          // the messages.
          else if (batchHeaders.length) {
            slice.batchAppendHeaders(batchHeaders, -1, false);
          }
          // If growth was requested/is allowed or our accuracy range already
          // covers as far back as we go, issue a (potentially expanding) sync.
          else if (userRequestsGrowth) {
            this._startSync(slice, null, slice.startTS);
          }
          // We are at the 'bottom', as it were.  Send an empty set.
          else {
            slice.sendEmptyCompletion();
          }
        }
      }

      // Iterate up to 'desiredCount' messages into the past, compute the sync
      // range, subtracting off the already known sync'ed range.
      this.getMessagesBeforeMessage(slice.startTS, slice.startUID,
                                    desiredCount, gotMessages.bind(this));
    }
  }