function() {        
      var defaultName = '新建文件夹',
          index = 0,
          name = defaultName;
      // Make sure this tag name is unique
      if(this.collection) {
        while( this.collection.isNameExisting(name) ) {
          ++ index;
          name = defaultName + index;
        }
      }
      else
        alert('null collection');
      return name;
    }