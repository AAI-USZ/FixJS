function() {        
      var defaultName = 'New folder',
          index = 0,
          name = defaultName;
      // Make sure this tag name is unique
      if(this.collection) {
        while( ! this.collection.isNameNew(name) ) {
          ++ index;
          name = defaultName + index;
        }
      }
      else
        alert('null collection');
      return name;
    }