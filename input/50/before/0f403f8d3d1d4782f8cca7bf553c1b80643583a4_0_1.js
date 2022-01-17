function() {
      if (!isPendingSelection) return;
      isPendingSelection = false;
      
      self.deselectAllRows();
      self.selectRowAtIndex(tableViewCell.getIndex());
    }