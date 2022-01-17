function gotBoxes(err, boxesRoot) {
      if (err) {
        console.error('Error looking up box:', err);
        done('unknown');
        return;
      }
      // We need to re-derive the path
      var folderMeta = null;
      function walkBoxes(boxLevel, pathSoFar) {
        for (var boxName in boxLevel) {
          var box = boxLevel[boxName],
              boxPath = pathSoFar ? (pathSoFar + boxName) : boxName,
              type = self._determineFolderType(box, boxPath);
          folderMeta = self._learnAboutFolder(boxName, boxPath, type,
                                              box.delim);
        }
      }
      walkBoxes(boxesRoot, '');
      if (folderMeta)
        done(null, folderMeta);
      else
        done('unknown');
    }