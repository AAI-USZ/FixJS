function walkBoxes(boxLevel, pathSoFar) {
        for (var boxName in boxLevel) {
          var box = boxLevel[boxName],
              boxPath = pathSoFar ? (pathSoFar + boxName) : boxName,
              type = self._determineFolderType(box, boxPath);
          folderMeta = self._learnAboutFolder(boxName, boxPath, type,
                                              box.delim);
        }
      }