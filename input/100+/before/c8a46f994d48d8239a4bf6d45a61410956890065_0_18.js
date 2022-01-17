function(name, path, type, delim) {
    var folderId = this.id + '/' + $a64.encodeInt(this.meta.nextFolderNum++);
    var folderInfo = this._folderInfos[folderId] = {
      $meta: {
        id: folderId,
        name: name,
        path: path,
        type: type,
        delim: delim,
      },
      $impl: {
        nextHeaderBlock: 0,
        nextBodyBlock: 0,
      },
      accuracy: [],
      headerBlocks: [],
      bodyBlocks: [],
    };
    this._folderStorages[folderId] =
      new $imapslice.ImapFolderStorage(this, folderId, folderInfo, this._db,
                                       this._LOG);

    var folderMeta = folderInfo.$meta;
    var idx = bsearchForInsert(this.folders, folderMeta, cmpFolderPubPath);
    this.folders.splice(idx, 0, folderMeta);

    this.universe.__notifyAddedFolder(this.id, folderMeta);
    return folderMeta;
  }