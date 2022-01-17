function(object, keyFieldName, valueFieldName) {
    if (!object) return;
    
    var keyFieldName = keyFieldName || 'name';
    var valueFieldName = valueFieldName || 'value';
    
    var numberOfItems = this.getNumberOfItems();
    var i, item;
    
    for (var key in object) {
      for (i = 0; i < numberOfItems; i++) {
        item = this.getItemAtIndex(i);
        
        if (item[keyFieldName] === key) {
          item[valueFieldName] = object[key];
          break;
        }
      }
    }
  }