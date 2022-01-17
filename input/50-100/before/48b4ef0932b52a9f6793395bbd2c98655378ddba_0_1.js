function pushAccountFolders(acct) {
      for (var iFolder = 0; iFolder < acct.folders.length; iFolder++) {
        var folder = acct.folders[iFolder];
        wireReps.push(folder);
        markers.push([acct.id, makeFolderSortString(acct.id, folder)]);
      }
    }