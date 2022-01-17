function(startTS, endTS, newToOld, doneCallback) {
console.log("syncDateRange:", startTS, endTS);
    var searchOptions = BASELINE_SEARCH_OPTIONS.concat(), self = this,
      storage = self._storage;
    if (startTS)
      searchOptions.push(['SINCE', startTS]);
    if (endTS)
      searchOptions.push(['BEFORE', endTS]);

    var callbacks = allbackMaker(
      ['search', 'db'],
      function syncDateRangeLogic(results) {
        var serverUIDs = results.search, headers = results.db,
            knownUIDs = [], uid, numDeleted = 0,
            modseq = self._conn._state.box.highestModSeq || '';

        if (serverUIDs.length > SYNC_BISECT_DATE_AT_N_MESSAGES) {
          var effEndTS = endTS || FUTURE_TIME_WARPED_NOW ||
                           quantizeDate(Date.now() + DAY_MILLIS),
              curDaysDelta = (effEndTS - startTS) / DAY_MILLIS;
          // We are searching more than one day, we can shrink our search.

          if (curDaysDelta > 1) {
            // Assume a linear distribution of messages, but overestimated by
            // a factor of two so we undershoot.
            var shrinkScale = SYNC_BISECT_DATE_AT_N_MESSAGES /
                                (serverUIDs.length * 2),
                backDays = Math.max(1,
                                    Math.ceil(shrinkScale * curDaysDelta));
            self._curSyncDoNotGrowWindowBefore = startTS;
            self._curSyncDayStep = backDays;
            self._curSyncStartTS = startTS = makeDaysBefore(effEndTS, backDays);
console.log("backoff! had", serverUIDs.length, "from", curDaysDelta,
            "startTS", startTS, "endTS", endTS, "backDays", backDays);
            return self.syncDateRange(startTS, endTS,
                                      newToOld, doneCallback);
          }
        }

        // -- infer deletion, flag to distinguish known messages
        // rather than splicing lists and causing shifts, we null out values.
        for (var iMsg = 0; iMsg < headers.length; iMsg++) {
          var header = headers[iMsg];
          var idxUid = serverUIDs.indexOf(header.id);
          // deleted!
          if (idxUid === -1) {
            storage.deleteMessageHeaderAndBody(header);
            numDeleted++;
            headers[iMsg] = null;
            continue;
          }
          // null out the UID so the non-null values in the search are the
          // new messages to us.
          serverUIDs[idxUid] = null;
          // but save the UID so we can do a flag-check.
          knownUIDs.push(header.id);
        }

        var newUIDs = compactArray(serverUIDs); // (re-labeling, same array)
        if (numDeleted)
          compactArray(headers);

        return self._commonSync(
          newUIDs, knownUIDs, headers,
          function(newCount, knownCount) {
            self._LOG.syncDateRange_end(newCount, knownCount, numDeleted,
                                        startTS, endTS);
            self._storage.markSyncRange(startTS, endTS, modseq,
                                        self._curSyncAccuracyStamp);
            doneCallback(newCount + knownCount);
          });
      });

    this._LOG.syncDateRange_begin(null, null, null, startTS, endTS);
    this._reliaSearch(searchOptions, callbacks.search);
    this._storage.getAllMessagesInImapDateRange(startTS, endTS, callbacks.db);
  }