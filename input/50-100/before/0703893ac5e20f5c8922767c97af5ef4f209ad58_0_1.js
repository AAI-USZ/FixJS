function() {
      var fileNames, idx, numFiles;
      numFiles = this.storageImpl.length;
      idx = 0;
      fileNames = [];
      while (idx < numFiles) {
        fileNames.push(localStorage.key(idx));
        ++idx;
      }
      return fileNames;
    }