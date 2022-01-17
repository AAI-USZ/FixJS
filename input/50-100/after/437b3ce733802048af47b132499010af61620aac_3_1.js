function(newCount, knownCount) {
            self._LOG.syncDateRange_end(newCount, knownCount, numDeleted,
                                        startTS, endTS);
            self._storage.markSyncRange(startTS, endTS, modseq,
                                        self._curSyncAccuracyStamp);
            doneCallback(newCount + knownCount);
          }