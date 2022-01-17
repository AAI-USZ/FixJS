function ma_viewFolderMessages(folder) {
    var handle = this._nextHandle++,
        slice = new HeadersViewSlice(this, handle);
    // the initial population counts as a request.
    slice.pendingRequestCount++;
    this._slices[handle] = slice;

    this.__bridgeSend({
      type: 'viewFolderMessages',
      folderId: folder.id,
      handle: handle,
    });

    return slice;
  }