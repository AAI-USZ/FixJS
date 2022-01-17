function(accountId, folderInfo, perFolderStuff,
                                    deletedFolderIds,
                                    callback, reuseTrans) {
    var trans = reuseTrans ||
      this._db.transaction([TBL_FOLDER_INFO, TBL_HEADER_BLOCKS,
                           TBL_BODY_BLOCKS],
                           'readwrite');
    trans.onerror = this._fatalError;
    trans.objectStore(TBL_FOLDER_INFO).put(folderInfo, accountId);
    var headerStore = trans.objectStore(TBL_HEADER_BLOCKS),
        bodyStore = trans.objectStore(TBL_BODY_BLOCKS), i;

    for (i = 0; i < perFolderStuff.length; i++) {
      var pfs = perFolderStuff[i], block;

      for (var headerBlockId in pfs.headerBlocks) {
        block = pfs.headerBlocks[headerBlockId];
        if (block)
          headerStore.put(block, pfs.id + ':' + headerBlockId);
        else
          headerStore.delete(pfs.id + ':' + headerBlockId);
      }

      for (var bodyBlockId in pfs.bodyBlocks) {
        block = pfs.bodyBlocks[bodyBlockId];
        if (block)
          bodyStore.put(block, pfs.id + ':' + bodyBlockId);
        else
          bodyStore.delete(pfs.id + ':' + bodyBlockId);
      }
    }

    if (deletedFolderIds) {
      for (i = 0; i < deletedFolderIds.length; i++) {
        var folderId = deletedFolderIds[i],
            range = IDBKeyRange.bound(folderId + ':',
                                      folderId + ':\ufff0',
                                      false, false);
        headerStore.delete(range);
        bodyStore.delete(range);
      }
    }

    if (callback)
      trans.addEventListener('complete', callback);

    return trans;
  }