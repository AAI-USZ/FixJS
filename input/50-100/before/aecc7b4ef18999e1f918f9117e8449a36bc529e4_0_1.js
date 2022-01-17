function createColumnPropertiesOnObject (obj) {
  var columnName;
  for (columnName in obj._getModel().columns) {
    var column = obj._getModel().columns[columnName];
    if (!obj[columnName]) {
      if (!column.foreignKey) {
        obj[columnName] = column.defaultValue();
      }
    }
  }
}