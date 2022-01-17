function(evt) {
    if (!isPendingSelection) return;
    isPendingSelection = false;
    
    window.clearTimeout(selectionTimeout);
    self.selectRowAtIndex(this.tableViewCell.getIndex());
  }