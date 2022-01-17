function ma_viewFolderMessages(folder) {
    var handle = this._nextHandle++,
        slice = new HeadersViewSlice(this, handle);
    this._slices[handle] = slice;

    this.__bridgeSend({
      type: 'viewFolderMessages',
      folderId: folder.id,
      handle: handle,
    });

    return slice;
  }