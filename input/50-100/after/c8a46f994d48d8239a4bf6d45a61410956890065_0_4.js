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