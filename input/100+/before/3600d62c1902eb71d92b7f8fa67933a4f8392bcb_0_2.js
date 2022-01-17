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