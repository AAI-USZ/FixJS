function() {

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
    	    data: JSON.stringify(contents),
    	    dataType: "json"
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

  }