function mb__cmd_viewFolders(msg) {
    var proxy = this._slices[msg.handle] =
          new SliceBridgeProxy(this, 'folders', msg.handle);
    this._slicesByType['folders'].push(proxy);
    proxy.mode = msg.mode;
    proxy.argument = msg.argument;
    var markers = proxy.markers = [];

    var wireReps = [];

    // folders currently come sorted by path
    function pushAccountFolders(acct) {
      for (var iFolder = 0; iFolder < acct.folders.length; iFolder++) {
        var folder = acct.folders[iFolder];
        wireReps.push(folder);
        markers.push([acct.id, makeFolderSortString(acct.id, folder)]);
      }
    }

    if (msg.mode === 'account') {
      pushAccountFolders(
        this.universe.getAccountForAccountId(msg.argument));
    }
    else {
      var accounts = this.universe.accounts.concat();

      // sort accounts by their id's
      accounts.sort(function (a, b) {
        return a.id.localeCompare(b.id);
      });

      for (var iAcct = 0; iAcct < accounts.length; iAcct++) {
        var acct = accounts[iAcct];
        wireReps.push(acct.toBridgeFolder());
        markers.push([acct.id, ACCT_FOLDER_SENTINEL]);
        pushAccountFolders(acct);
      }
    }
    proxy.sendSplice(0, 0, wireReps, true, false);
  }