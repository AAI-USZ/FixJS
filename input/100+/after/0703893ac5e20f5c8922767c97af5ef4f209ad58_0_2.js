function() {
  var FileStorage, prefix;
  prefix = "Strut_";
  FileStorage = (function() {

    function FileStorage() {
      this.storageImpl = localStorage;
    }

    FileStorage.prototype.fileNames = function() {
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
    };

    FileStorage.prototype.remove = function(fileName) {
      return this.storageImpl.removeItem(prefix + fileName);
    };

    FileStorage.prototype.save = function(fileName, contents) {
      return this.storageImpl.setItem(prefix + fileName, JSON.stringify(contents));
    };

    FileStorage.prototype.open = function(fileName) {
      return JSON.parse(this.storageImpl.getItem(prefix + fileName));
    };

    return FileStorage;

  })();
  return new FileStorage();
}