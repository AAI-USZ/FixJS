function(slice, headers, moreMessagesComing) {
    slice.atBottom = this.headerIsOldestKnown(slice.endTS, slice.endUID);

    if (headers.length)
      slice.batchAppendHeaders(headers, -1, moreMessagesComing);
    else if (!moreMessagesComing)
      slice.setStatus('synced', true, false);

    if (!moreMessagesComing)
      slice.waitingOnData = false;
  }