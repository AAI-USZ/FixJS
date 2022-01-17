function(context) {
    var columns = context.ordinalColumnsSync(this.tableName);
    var fields = columns.map(this.columnToIndexField, this);
    return fields;
  }