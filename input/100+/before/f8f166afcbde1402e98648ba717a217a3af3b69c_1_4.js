function(conn, callback, err, boxesRoot) {
    var self = this;
    if (err) {
      // XXX need to deal with transient failure states
      this.__folderDoneWithConnection(null, conn);
      callback();
      return;
    }

    // - build a map of known existing folders
    var folderPubsByPath = {}, folderPub;
    for (var iFolder = 0; iFolder < this.folders.length; iFolder++) {
      folderPub = this.folders[iFolder];
      folderPubsByPath[folderPub.path] = folderPub;
    }

    // - walk the boxes
    function walkBoxes(boxLevel, pathSoFar) {
      for (var boxName in boxLevel) {
        var box = boxLevel[boxName],
            path = pathSoFar ? (pathSoFar + boxName) : boxName;

        // - already known folder
        if (folderPubsByPath.hasOwnProperty(path)) {
          // mark it with true to show that we've seen it.
          folderPubsByPath = true;
        }
        // - new to us!
        else {
          var type = self._determineFolderType(box, path);
          self._learnAboutFolder(boxName, path, type, box.delim);
        }

        if (box.children)
          walkBoxes(box.children, pathSoFar + boxName + box.delim);
      }
    }
    walkBoxes(boxesRoot, '');

    // - detect deleted folders
    // track dead folder id's so we can issue a
    var deadFolderIds = [];
    for (var folderPath in folderPubsByPath) {
      folderPub = folderPubsByPath[folderPath];
      // (skip those we found above)
      if (folderPub === true)
        continue;
      // It must have gotten deleted!
      this._forgetFolder(folderPub.id);
    }

    this.__folderDoneWithConnection(null, conn);
    // be sure to save our state now that we are up-to-date on this.
    this.saveAccountState();
    callback();
  }