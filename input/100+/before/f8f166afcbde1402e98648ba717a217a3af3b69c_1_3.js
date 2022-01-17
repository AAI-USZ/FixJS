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