function ifs_addMessageHeader(header) {
    if (this._pendingLoads.length) {
      this._deferredCalls.push(this.addMessageHeader.bind(this, header));
      return;
    }

    if (this._curSyncSlice)
      this._curSyncSlice.onHeaderAdded(header);
    // - Generate notifications for (other) interested slices
    if (this._slices.length > (this._curSyncSlice ? 1 : 0)) {
      var date = header.date, uid = header.id;
      for (var iSlice = 0; iSlice < this._slices.length; iSlice++) {
        var slice = this._slices[iSlice];

        if (slice === this._curSyncSlice)
          continue;
        // We never automatically grow a slice into the past, so bail on that.
        if (BEFORE(date, slice.startTS))
          continue;
        // We do grow a slice into the present if it's already up-to-date...
        if (SINCE(date, slice.endTS)) {
          // !(covers most recently known message)
          if(!(this._headerBlockInfos.length &&
               slice.endTS === this._headerBlockInfos[0].endTS &&
               slice.endUID === this._headerBlockInfos[0].endUID))
            continue;
        }
        else if ((date === slice.startTS &&
                  uid < slice.startUID) ||
                 (date === slice.endTS &&
                  uid > slice.endUID)) {
          continue;
        }
        slice.onHeaderAdded(header);
      }
    }


    this._insertIntoBlockUsingDateAndUID(
      'header', header.date, header.id, HEADER_EST_SIZE_IN_BYTES,
      header, null);
  }