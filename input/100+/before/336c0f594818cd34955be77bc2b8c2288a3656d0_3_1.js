function(keyFieldName, valueFieldName) {
    var keyFieldName = keyFieldName || 'name';
    var valueFieldName = valueFieldName || 'value';
    
    var numberOfItems = this.getNumberOfItems();
    var valuesArray = [];
    var item, name, value;
    
    for (var i = 0; i < numberOfItems; i++) {
      item = this.getItemAtIndex(i);
      name = item[keyFieldName];
      value = item[valueFieldName];
      
      if (name && value !== undefined) valuesArray.push({
        name: item[keyFieldName],
        value: item[valueFieldName]
      });
    }
    
    return valuesArray;
  }