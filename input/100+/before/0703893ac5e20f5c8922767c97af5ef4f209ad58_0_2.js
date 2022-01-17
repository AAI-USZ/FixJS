function() {
  var FileStorage;
  FileStorage = (function() {

    function FileStorage() {
      this.storageImpl = localStorage;
    }

    FileStorage.prototype.fileNames = function() {
      var fileNames, idx, numFiles;
      numFiles = this.storageImpl.length;
      idx = 0;
      fileNames = [];
      while (idx < numFiles) {
        fileNames.push(localStorage.key(idx));
        ++idx;
      }
      return fileNames;
    };

    FileStorage.prototype.remove = function(fileName) {
      return this.storageImpl.removeItem(fileName);
    };

    FileStorage.prototype.save = function(fileName, contents) {
      return this.storageImpl.setItem(fileName, JSON.stringify(contents));
    };

    FileStorage.prototype.open = function(fileName) {
      return JSON.parse(this.storageImpl.getItem(fileName));
    };

    return FileStorage;

  })();
  return new FileStorage();
}