function(settings, reflow) {
  if (!settings && this.allColumns) {
    var columns = this.allColumns;
  } else {
    if (arguments.length > 1 || (typeof settings != 'object' && typeof settings.item != 'function')) 
      settings = arguments;
    for (var i = 0, j = settings.length, columns = []; i < j; i++)
      columns.push(Bento.Column(this.columns && this.columns[i], settings[i]))
    delete this.maxWidth
    delete this.minWidth;
  }   
  var that = this, diff = reflow;
  if (!this.allColumns) this.allColumns = columns;
  columns = columns.filter(function(column, i) {
    if (column.element) {
      column.previousWidth = column.width;
      column.setWidth(column.element);
    }
    if (that.columns) {
      if (column.width && that.columns[i] != column) 
        diff = true;
    } else diff = true;
    return column.width;
  });
  if (this.columns) 
    for (var i = columns.length, j = this.columns.length; i < j; i++) {
      diff = true;
      delete this.columns[i].width;
    }
  if (diff) {
    for (var i = 0, column; column = this.allColumns[i]; i++)
      if (column.height) column.reset();
    for (var i = 0, column; column = columns[i]; i++) {
      if (this.maxWidth == null || column.width < this.minWidth) this.minWidth = column.width;
      if (this.maxWidth == null || column.width > this.maxWidth) this.maxWidth = column.width;
    }
    this.columns = columns
    this.reflow();
    return this.columns;
  }
}