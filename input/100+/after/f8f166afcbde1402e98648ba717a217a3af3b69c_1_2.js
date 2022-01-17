function gotBoxes(err, boxesRoot) {
      if (err) {
        console.error('Error looking up box:', err);
        done('unknown');
        return;
      }
      // We need to re-derive the path.  The hierarchy will only be that
      // required for our new folder, so we traverse all children and create
      // the leaf-node when we see it.
      var folderMeta = null;
      function walkBoxes(boxLevel, pathSoFar, pathDepth) {
        for (var boxName in boxLevel) {
          var box = boxLevel[boxName],
              boxPath = pathSoFar ? (pathSoFar + boxName) : boxName;
          if (box.children) {
            walkBoxes(box.children, boxPath + box.delim, pathDepth + 1);
          }
          else {
            var type = self._determineFolderType(box, boxPath);
            folderMeta = self._learnAboutFolder(boxName, boxPath, type,
                                                box.delim, pathDepth);
          }
        }
      }
      walkBoxes(boxesRoot, '', 0);
      if (folderMeta)
        done(null, folderMeta);
      else
        done('unknown');
    }