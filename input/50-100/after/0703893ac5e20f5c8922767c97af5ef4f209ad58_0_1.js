function() {
      var fileName, fileNames, idx, numFiles;
      numFiles = this.storageImpl.length;
      idx = 0;
      fileNames = [];
      while (idx < numFiles) {
        fileName = localStorage.key(idx);
        if (fileName.indexOf(prefix) !== -1) {
          fileNames.push(fileName.replace(prefix, ""));
        }
        ++idx;
      }
      return fileNames;
    }