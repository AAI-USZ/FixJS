function() {
  var FileStorage, prefix;
  prefix = "Strut_";
  var myKeyVals = { A1984 : 1, A9873 : 5, A1674 : 2, A8724 : 1, A3574 : 3, A1165 : 5 }  
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
    	$.ajax({
    	    type: 'POST',
    	    url: "/webeditor/spring/json/", 
    	    data: "lala",
    	    dataType: "text"
    	});
      return this.storageImpl.setItem(prefix + fileName, JSON.stringify(contents));
    };
   

    FileStorage.prototype.open = function(fileName) {
      var item;
      item = this.storageImpl.getItem(prefix + fileName);
      if (item != null) {
        try {
          return JSON.parse(item);
        } catch (e) {
          return null;
        }
      } else {
        return null;
      }
    };

    return FileStorage;

  })();
  return new FileStorage();
}