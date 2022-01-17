function(date, uid, limit, messageCallback) {
    var toFill = (limit != null) ? limit : TOO_MANY_MESSAGES, self = this;

    var headerPair = this._findRangeObjIndexForDateAndUID(
                       this._headerBlockInfos, date, uid);
    var iHeadBlockInfo = headerPair[0];
    var headBlockInfo = headerPair[1];

    if (!headBlockInfo) {
      // The iteration request is somehow not current; log an error and return
      // an empty result set.
      this._LOG.badIterationStart(date, uid);
      messageCallback([], false);
      return;
    }

    var iHeader = null;
    function fetchMore() {
      while (true) {
        // - load the header block if required
        if (!self._headerBlocks.hasOwnProperty(headBlockInfo.blockId)) {
          self._loadBlock('header', headBlockInfo.blockId, fetchMore);
          return;
        }
        var headerBlock = self._headerBlocks[headBlockInfo.blockId];

        // Null means find it by uid...
        if (iHeader === null) {
          iHeader = headerBlock.uids.indexOf(uid);
          if (iHeader === -1) {
            self._LOG.badIterationStart(date, uid);
            toFill = 0;
          }
          iHeader++;
        }
        // otherwise we know we are starting at the front of the block.
        else {
          iHeader = 0;
        }

        var useHeaders = Math.min(
              headerBlock.headers.length - iHeader,
              toFill);
        if (iHeader >= headerBlock.headers.length)
          useHeaders = 0;
        toFill -= useHeaders;

        // If there's nothing more to...
        if (!toFill) {
        }
        // - There may be viable messages in the next block, check.
        else if (++iHeadBlockInfo >= self._headerBlockInfos.length) {
          // Nope, there are no more messages, nothing left to do.
          toFill = 0;
        }
        else {
          headBlockInfo = self._headerBlockInfos[iHeadBlockInfo];
        }
        // generate the notifications for what we did create
        messageCallback(headerBlock.headers.slice(iHeader,
                                                  iHeader + useHeaders),
                        Boolean(toFill));
        if (!toFill)
          return;
        // (there must be some overlap, keep going)
      }
    }

    fetchMore();
  }