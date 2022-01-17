function(evt) {
    if (!isPendingSelection) return;
    isPendingSelection = false;
    
    window.clearTimeout(selectionTimeout);
  
    var tableViewCell = this.tableViewCell;
    
    self.deselectAllRows();
    self.selectRowAtIndex(tableViewCell.getIndex());
  }