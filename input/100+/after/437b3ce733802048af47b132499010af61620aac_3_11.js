function(slice, triggerRefresh,
                             headers, moreMessagesComing) {
    slice.atBottom = this.headerIsOldestKnown(slice.endTS, slice.endUID);

    var triggerNow = false;
    if (!moreMessagesComing && triggerRefresh) {
      moreMessagesComing = true;
      triggerNow = true;
    }

    if (headers.length) {
      slice.batchAppendHeaders(headers, -1, moreMessagesComing);
    }
    else if (!moreMessagesComing) {
      slice.setStatus('synced', true, false);
      slice.waitingOnData = false;
    }
    else if (triggerNow) {
      slice.waitingOnData = 'refresh';
      this.refreshSlice(slice);
    }
  }