function() {
    var $element = this.$element;    
    
    var dataSource = this.getDataSource();
    var visibleCells = this.getVisibleCells();
    
    var i, length, visibleCellsToReuse = [];
    for (i = 0, length = visibleCells.length; i < length; i++) visibleCellsToReuse.push(visibleCells[i]);
    for (i = 0, length = visibleCellsToReuse.length; i < length; i++) visibleCellsToReuse[i].prepareForReuse();
    
    var numberOfRows = this._numberOfRows = dataSource.getNumberOfRows();
    var visibleCellCount = Math.min(this.getCalculatedNumberOfVisibleCells(), numberOfRows);
    var hiddenCellCount = numberOfRows - visibleCellCount;
    
    for (i = 0; i < visibleCellCount; i++) {
      var cell = dataSource.getCellForRowAtIndex(this, i);      
      $element.append(cell.$element);
    }
    
    this.resetScrollView();
  }