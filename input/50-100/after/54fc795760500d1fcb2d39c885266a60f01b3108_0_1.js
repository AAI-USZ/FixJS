function(evt) {
    if (!isPendingSelection) return;
    isPendingSelection = false;
    
    var tableViewCell = this.tableViewCell;
    
    window.clearTimeout(selectionTimeout);
    
    tableViewCell.didReceiveTap();
    self.selectRowAtIndex(this.tableViewCell.getIndex());
  }