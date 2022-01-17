function(database) {
    var columns = database.ordinalColumnsSync(this.tableName);
    var fields = columns.map(this.columnToIndexField, this);
    return fields;
  }